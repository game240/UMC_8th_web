import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import axiosClient from "../services/api";

import { useLocalStorage } from "../hooks/useLocalStorage";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

interface AuthActions {
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

let isInterceptorSetup = false;
/** checks that token is under refreshing */
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * queue에 있는 요청들을 처리하는 함수
 * @param {AxiosError | null} error - 발생한 에러
 * @param {string | null} token - 새로운 accessToken
 */
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const createAxiosResponseInterceptor = (authActions: AuthActions) => {
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (originalRequest?.url?.endsWith("/v1/auth/refresh")) {
        return Promise.reject(error);
      }

      if (
        error.response?.status !== 401 ||
        (originalRequest as AxiosRequestConfigWithRetry)._retry
      ) {
        return Promise.reject(error);
      }

      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if ((originalRequest as AxiosRequestConfigWithRetry)._retry) {
        return Promise.reject(error);
      }

      (originalRequest as AxiosRequestConfigWithRetry)._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest && originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            if (originalRequest) {
              return axiosClient(originalRequest);
            }
            return Promise.reject(new Error("Original request is undefined"));
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshAccessToken = async () => {
          try {
            const newAccessToken = await authActions.refreshAccessToken();
            if (newAccessToken) {
              axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
              if (originalRequest && originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              }
              processQueue(null, newAccessToken);
              if (originalRequest) {
                resolve(axiosClient(originalRequest));
              } else {
                reject(new Error("Original request is undefined"));
              }
            } else {
              processQueue(
                {
                  ...error,
                  message: "Failed to refresh token",
                  isAxiosError: true,
                  toJSON: () => ({}),
                } as AxiosError,
                null
              );
              authActions.logout();
              window.location.href = "/login";
              reject(error);
            }
          } catch (error) {
            processQueue(error as AxiosError, null);
            authActions.logout();
            window.location.href = "/login";
            reject(error);
          } finally {
            isRefreshing = false;
          }
        };
        refreshAccessToken();
      });
    }
  );
};

export const setupAxiosInterceptors = (authActions: AuthActions): void => {
  if (isInterceptorSetup) return;

  axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { getItem: getAccessTokenItem } = useLocalStorage("accessToken");
      const token = getAccessTokenItem();
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  createAxiosResponseInterceptor(authActions);
  isInterceptorSetup = true;
};
