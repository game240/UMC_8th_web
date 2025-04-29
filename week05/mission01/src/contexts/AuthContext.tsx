import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [accessToken, setAccessTokenItem]);

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

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
