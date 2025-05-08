import clsx from "clsx";
import { useState } from "react";

const Toggle = () => {
  // 0, 1 순서
  const [toggle, setToggle] = useState(false);

  const defaultClassName = "px-4 py-2";
  const activeClassName = clsx(defaultClassName, "border-1 border-solid border-white text-white");
  const inactiveClassName = clsx(defaultClassName, "bg-white");

  return (
    <button
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <button className={clsx(!toggle ? activeClassName : inactiveClassName, "rounded-l-lg")}>
        오래된순
      </button>
      <button className={clsx(toggle ? activeClassName : inactiveClassName, "rounded-r-lg")}>
        최신순
      </button>
    </button>
  );
};

export default Toggle;
