import { useNavigate } from "react-router-dom";

import SideBarBtn from "./SideBarBtn";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const SideBar = ({ ...props }) => {
  const navigate = useNavigate();
  return (
    <aside
      className="flex flex-col justify-between fixed top-0 w-[10%] h-full bg-[#111]"
      {...props}
    >
      <div>
        <SideBarBtn></SideBarBtn>
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
      <SideBarBtn className="flex justify-center">탈퇴하기</SideBarBtn>
    </aside>
  );
};

export default SideBar;
