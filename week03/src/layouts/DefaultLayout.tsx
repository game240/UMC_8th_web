import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  return (
    <div className="bg-black w-screen">
      <div className="mx-48 min-h-screen">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
