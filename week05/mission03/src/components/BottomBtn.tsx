const BottomBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button
      type="submit"
      className="bg-rose-900 w-full h-10 rounded-[8px] text-white disabled:bg-[#111] "
      {...props}
    ></button>
  );
};

export default BottomBtn;
