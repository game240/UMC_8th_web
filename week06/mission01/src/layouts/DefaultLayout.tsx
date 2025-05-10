import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";
import PaddingLayout from "./PaddingLayout";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col items-center w-screen bg-black ">
      <div className="w-full h-full">
        <NavBar />
        <div className="flex">
          <SideBar />
          <PaddingLayout />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
