import { TextBtnProps } from "../types/button";

const TextBtn: React.FC<TextBtnProps> = ({ children, className, ...props }) => {
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
