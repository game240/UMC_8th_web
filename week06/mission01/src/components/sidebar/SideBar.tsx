import clsx from "clsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import SideBarBtn from "./SideBarBtn";

import SideBarContext from "../../contexts/SideBarContext";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const SideBar = ({ ...props }) => {
  const { isSideBarOpen } = useContext(SideBarContext)!;

  const navigate = useNavigate();
  return (
    <aside
      className={clsx(
        "flex flex-col justify-between fixed w-48 h-full bg-[#111] transition-common z-30",
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      )}
      {...props}
    >
      <div>
        <SideBarBtn />
        <SideBarBtn>
          <SearchIcon sx={{ color: "white" }} />
          찾기
        </SideBarBtn>
        <SideBarBtn
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <PersonIcon sx={{ color: "white" }} />
          마이페이지
        </SideBarBtn>
      </div>
      <SideBarBtn className="flex justify-center ">탈퇴하기</SideBarBtn>
    </aside>
  );
};

export default SideBar;
