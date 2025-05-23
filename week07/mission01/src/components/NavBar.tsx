import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext.tsx";
import SideBarContext from "../contexts/SideBarContext.tsx";

import { useLocalStorage } from "../hooks/useLocalStorage.tsx";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = ({ ...props }) => {
  const { isAuthenticated, signOut } = useContext(AuthContext)!;
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext)!;
  const { getItem: getName } = useLocalStorage("name");
  const navigate = useNavigate();

  return (
    <nav
      className="flex justify-between items-center fixed px-4 w-full h-16 bg-[#111] z-40"
      {...props}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
        >
          <MenuIcon sx={{ color: "white", fontSize: 30 }} />
        </button>
        <button
          className="size-full"
          onClick={() => {
            navigate("/");
          }}
        >
          <p className="text-3xl text-pink-500 font-extrabold">DOLIGO</p>
        </button>
      </div>
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <button
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-black"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
            <button
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-pink-500"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <button>
              <SearchIcon sx={{ color: "white" }} />
            </button>
            <p>{getName()}님 반갑습니다.</p>
            <button
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-black"
              onClick={() => {
                navigate("/");
                signOut();
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
