import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";

import PaddingLayout from "./PaddingLayout";

import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";

import SideBarContext from "../contexts/SideBarContext";

import useWindowWidth from "../hooks/useWindowWidth";
import useOutsideClick from "../hooks/useOutsideClick";

const DefaultLayout = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext)!;
  const { xxl } = useWindowWidth();

  const zIndex = xxl ? "-z-10" : "z-20";

  const sideBarRef = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: sideBarRef });

  useEffect(() => {
    if (isOutside && isSideBarOpen && !xxl) {
      setIsSideBarOpen(false);
    }
  }, [isOutside, isSideBarOpen, setIsSideBarOpen, xxl]);

  return (
    <div className="flex flex-col items-center w-screen bg-black ">
      <div className="w-full h-full">
        <NavBar ref={sideBarRef} />
        <div className="flex relative">
          <div
            className={clsx(
              "hidden xl:block absolute top-0 left-0 size-full bg-black transition-common ",
              isSideBarOpen ? clsx("opacity-50", zIndex) : "opacity-0 -z-10"
            )}
          ></div>
          <SideBar ref={sideBarRef} />
          <PaddingLayout />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
