import { BtnProps } from "../types/button";

const TextBtn: React.FC<BtnProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`border-none bg-transparent cursor-pointer text-gray-500 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextBtn;
