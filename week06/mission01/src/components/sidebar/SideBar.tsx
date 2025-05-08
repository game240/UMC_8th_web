import { useNavigate } from "react-router-dom";
import SideBarBtn from "./SideBarBtn";

const SideBar = ({ ...props }) => {
  const navigate = useNavigate();
  return (
    <aside
      className="flex flex-col justify-between fixed top-0 w-[10%] h-full bg-[#111]"
      {...props}
    >
      <div>
        <SideBarBtn></SideBarBtn>
        <SideBarBtn>찾기</SideBarBtn>
        <SideBarBtn
          onClick={() => {
            navigate("/mypage");
          }}
        >
          마이페이지
        </SideBarBtn>
      </div>
      <SideBarBtn>탈퇴하기</SideBarBtn>
    </aside>
  );
};

export default SideBar;
