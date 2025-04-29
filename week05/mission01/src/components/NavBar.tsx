import { useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext)!;
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 w-full h-16 bg-[#111]">
      <div className="relative">
        <p className="text-3xl text-rose-900 font-extrabold">돌려돌려 LP판</p>
        <button
          className="absolute top-0 left-0 size-full"
          onClick={() => {
            navigate("/");
          }}
        ></button>
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
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-rose-900"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <button
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-black"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              마이페이지
            </button>
            <button
              className="w-[80px] h-[36px] rounded-[8px] text-white bg-rose-900"
              onClick={() => {
                navigate("/");
                signOut();
              }}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
