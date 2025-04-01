import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="mx-48">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
