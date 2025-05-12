import { Outlet } from "react-router-dom";

const PaddingLayout = () => {
  return (
    <div className="pt-20 pl-[10%] w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default PaddingLayout;
