import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

interface SideBarContextType {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBtnOpen: boolean) => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const { xxl } = useWindowWidth();

  useEffect(() => {
    if (xxl) {
      setIsSideBarOpen(true);
    } else {
      setIsSideBarOpen(false);
    }
  }, [xxl]);

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;
