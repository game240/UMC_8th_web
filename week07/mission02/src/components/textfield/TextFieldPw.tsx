import { useState } from "react";
import TextField from "./TextField";
import { TextFieldProps } from "./types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TextFieldPw: React.FC<TextFieldProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <TextField {...props} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        className="absolute top-5 right-2 -translate-y-1/2 flex items-center"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </button>
    </div>
  );
};

export default TextFieldPw;
