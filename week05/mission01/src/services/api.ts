import axios from "axios";

import { useLocalStorage } from "../hooks/useLocalStorage";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

axiosClient.interceptors.request.use((config) => {
  const { getItem: getAccessToken } = useLocalStorage("accessToken");
  const { getItem: getRefreshToken } = useLocalStorage("refreshToken");

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers["Refresh-Token"] = refreshToken;
  }
  return config;
});
