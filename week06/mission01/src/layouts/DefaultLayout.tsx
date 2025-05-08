import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-black ">
      <div className="w-full h-full">
        <NavBar />
        <div className="flex">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
