import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AuthContext from "../contexts/AuthContext.tsx";
import SideBarContext from "../contexts/SideBarContext.tsx";

import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import axiosClient from "../services/api";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import useOutsideClick from "../hooks/useOutsideClick";
import useDebounce from "../hooks/useDebounce";

const NavBar = ({ ...props }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isAuthenticated, signOut } = useContext(AuthContext)!;
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext)!;
  const { getItem: getName } = useLocalStorage("name");
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosClient.get("/v1/users/me");
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const displayName = userData?.data?.name || getName();

  const searchRef = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLDivElement | null>(null);
  const { isOutside } = useOutsideClick({
    ref: searchRef,
    additionalRefs: [searchResultRef],
  });

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    navigate(`/?search=${encodeURIComponent(debouncedSearchInput)}`);
  }, [debouncedSearchInput, navigate]);

  const onClickSearch = () => {
    // "/"의 param으로 전달
    navigate(`/?search=${encodeURIComponent(searchInput)}`);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isOutside) {
      setIsSearchOpen(false);
    }
  }, [isOutside]);

  return (
    <>
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
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="검색"
                  className="p-2 w-[400px] h-[36px] rounded-[8px] border border-gray-700 text-white"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  onFocus={() => {
                    setIsSearchOpen(true);
                  }}
                />
                {isSearchOpen && (
                  <div
                    ref={searchResultRef}
                    className="flex flex-col gap-2 absolute translate-y-[10px] p-2 w-full bg-black rounded-[8px] z-50"
                  >
                    <p>sdaffdsasdaf</p>
                    <p>dssaf</p>
                  </div>
                )}
              </div>

              <button
                onClick={onClickSearch}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700"
              >
                <SearchIcon sx={{ color: "white" }} />
              </button>
              <p>{displayName}님 반갑습니다.</p>
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
    </>
  );
};

export default NavBar;
