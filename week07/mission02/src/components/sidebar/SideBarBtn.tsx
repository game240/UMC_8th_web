import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const SideBarBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex items-center gap-2 px-[10%] w-full h-16 text-white text-left whitespace-nowrap cursor-pointer hover:bg-black",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SideBarBtn;
