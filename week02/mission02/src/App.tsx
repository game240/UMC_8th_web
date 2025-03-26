import { useContext } from "react";

import ThemeContext from "./contexts/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  return (
    <div
      className={
        "flex items-center justify-center w-screen h-screen " +
        (theme === "light" ? "bg-white" : "bg-gray-900")
      }
    >
      <button
        className={theme === "light" ? "text-white bg-gray-900" : "text-black bg-white"}
        onClick={toggleTheme}
      >
        다크모드 전환
      </button>
    </div>
  );
}

export default App;
