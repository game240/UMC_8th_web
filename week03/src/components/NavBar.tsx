import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextBtn from "./TextBtn";

import { BtnProps } from "../types/button";
import { Category } from "../types/movie";

interface NavBtnProps extends BtnProps {
  route: string;
  category: Category;
}

const NavBar = () => {
  const [currentPage, setCurrentPage] = useState<Category>("all");

  const NavBtn: React.FC<NavBtnProps> = ({ children, route, category: Category }) => {
    const navigate = useNavigate();
    return (
      <TextBtn
        className={`${currentPage === Category ? "text-green-300 underline" : ""}`}
        onClick={() => {
          setCurrentPage(Category);
          navigate(route);
        }}
      >
        {children}
      </TextBtn>
    );
  };

  return (
    <nav className="flex gap-2 h-16">
      <NavBtn route="/movies/home" category="all">
        홈
      </NavBtn>
      <NavBtn route="/movies/popular" category="popular">
        인기 영화
      </NavBtn>
      <NavBtn route="/movies/now_playing" category="now_playing">
        상영 중
      </NavBtn>
      <NavBtn route="/movies/top_rated" category="top_rated">
        평점 높은
      </NavBtn>
      <NavBtn route="/movies/upcoming" category="upcoming">
        개봉 예정
      </NavBtn>
    </nav>
  );
};

export default NavBar;
