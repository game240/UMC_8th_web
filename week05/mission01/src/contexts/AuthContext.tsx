import { createContext, PropsWithChildren, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  signIn: () => {},
  signOut: () => {},
});

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
    <AuthContext.Provider value={{ accessToken, refreshToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
