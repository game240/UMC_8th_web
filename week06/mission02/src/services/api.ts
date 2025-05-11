import axios from "axios";

import { useLocalStorage } from "../hooks/useLocalStorage";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const { getItem: getAccessTokenItem } = useLocalStorage("accessToken");
    const token = getAccessTokenItem();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
