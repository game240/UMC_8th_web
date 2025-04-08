import { BtnProps } from "../types/button";

const PageBtn: React.FC<BtnProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`${className} flex justify-center items-center w-16 h-12 text-white rounded-2xl cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PageBtn;
