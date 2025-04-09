const NavBar = () => {
  return (
    <nav className="flex justify-between items-center px-8 w-full h-16 bg-[#111]">
      <p className="text-3xl text-rose-900 font-extrabold">돌려돌려 LP판</p>
      <div className="flex gap-4">
        <button className="w-[80px] h-[36px] rounded-[8px] text-white bg-black">로그인</button>
        <button className="w-[80px] h-[36px] rounded-[8px] text-white bg-rose-900">회원가입</button>
      </div>
    </nav>
  );
};

export default NavBar;
