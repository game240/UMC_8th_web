import clsx from "clsx";
import { useContext } from "react";

import PaddingLayout from "./PaddingLayout";

import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";

import SideBarContext from "../contexts/SideBarContext";

import useWindowWidth from "../hooks/useWindowWidth";

const DefaultLayout = () => {
  const { isSideBarOpen } = useContext(SideBarContext)!;
  const { xxl } = useWindowWidth();

  const zIndex = xxl ? "-z-10" : "z-20";

  return (
    <div className="flex flex-col items-center w-screen bg-black ">
      <div className="w-full h-full">
        <NavBar />
        <div className="flex relative">
          <div
            className={clsx(
              "hidden xl:block absolute top-0 left-0 size-full bg-black transition-common ",
              isSideBarOpen ? clsx("opacity-50", zIndex) : "opacity-0 -z-10"
            )}
          ></div>
          <SideBar />
          <PaddingLayout />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
