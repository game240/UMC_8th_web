import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

interface SideBtnContextType {
  isSideBtnOpen: boolean;
  setIsSideBtnOpen: (isSideBtnOpen: boolean) => void;
}

const SideBtnContext = createContext<SideBtnContextType | undefined>(undefined);

export const SideBtnProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSideBtnOpen, setIsSideBtnOpen] = useState(true);

  const { xxl } = useWindowWidth();

  useEffect(() => {
    if (xxl) {
      setIsSideBtnOpen(true);
    } else {
      setIsSideBtnOpen(false);
    }
  }, [xxl]);

  return (
    <SideBtnContext.Provider value={{ isSideBtnOpen, setIsSideBtnOpen }}>
      {children}
    </SideBtnContext.Provider>
  );
};

export default SideBtnContext;
