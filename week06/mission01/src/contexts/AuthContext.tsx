import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

import axiosClient from "../services/api";

import { setupAxiosInterceptors } from "../utils/AxiosInterceptor";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenItem,
    setItem: setAccessTokenItem,
    removeItem: removeAccessTokenItem,
  } = useLocalStorage("accessToken");
  const {
    getItem: getRefreshTokenItem,
    setItem: setRefreshTokenItem,
    removeItem: removeRefreshTokenItem,
  } = useLocalStorage("refreshToken");

  const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenItem());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenItem());

  // 초기 init 상태, default: true
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = !!accessToken;

  const signIn = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setAccessTokenItem(accessToken);
    setRefreshTokenItem(refreshToken);
  };

  const signOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    removeAccessTokenItem();
    removeRefreshTokenItem();
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshTokenItem();
    if (!refreshToken) {
      signOut();
      return null;
    }

    try {
      const { data } = await axiosClient.post("/v1/auth/refresh", { refresh: refreshToken });
      const newAccessToken = data.data.accessToken;

      setAccessToken(newAccessToken);
      setAccessTokenItem(newAccessToken);
      return newAccessToken;
    } catch {
      signOut();
      return null;
    }
  };

  useEffect(() => {
    // Axios 인터셉터 설정
    setupAxiosInterceptors({ refreshAccessToken, logout: signOut });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (!accessToken && refreshToken) {
        await refreshAccessToken();
      }
      // 초기 init 완료
      setIsInitializing(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // under init: do nothing
  if (isInitializing) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, signIn, signOut, isAuthenticated, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
