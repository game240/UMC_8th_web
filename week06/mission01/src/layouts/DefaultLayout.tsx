import clsx from "clsx";
import { useContext } from "react";

import PaddingLayout from "./PaddingLayout";

import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";

import SideBtnContext from "../contexts/SideBtnContext";

import useWindowWidth from "../hooks/useWindowWidth";

const DefaultLayout = () => {
  const { isSideBtnOpen } = useContext(SideBtnContext)!;
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
              isSideBtnOpen ? clsx("opacity-50", zIndex) : "opacity-0 -z-10"
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
