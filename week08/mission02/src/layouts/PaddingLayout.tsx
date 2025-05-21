import { Outlet } from "react-router-dom";
import FloatingAddBtn from "../components/FloatingAddBtn";

const PaddingLayout = () => {
  return (
    <div className="relative pt-20 pl-[10%] w-full min-h-screen">
      <Outlet />
      <FloatingAddBtn className="fixed bottom-20 right-20" />
    </div>
  );
};

export default PaddingLayout;
