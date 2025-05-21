import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GoogleLoginRedirect = () => {
  const { setItem: setAccessToken } = useLocalStorage("accessToken");
  const { setItem: setRefreshToken } = useLocalStorage("refreshToken");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("로그인에 실패했습니다.");
      window.location.href = "/login";
      return;
    }
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    window.location.href = "/";
  }, [setAccessToken, setRefreshToken]);

  return <div></div>;
};

export default GoogleLoginRedirect;
