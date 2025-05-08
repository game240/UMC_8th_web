import { ButtonHTMLAttributes } from "react";

const SideBarBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button className="w-full h-16 text-white cursor-pointer hover:bg-black" {...props}>
      {children}
    </button>
  );
};

export default SideBarBtn;
