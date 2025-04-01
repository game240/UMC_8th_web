import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  return (
    <div className="mx-48">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
