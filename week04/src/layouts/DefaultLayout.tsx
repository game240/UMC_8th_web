import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  return (
    <div className="bg-black w-full flex flex-col items-center">
      <div className="w-2/3 min-h-screen">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
