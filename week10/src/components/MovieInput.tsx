import type { InputHTMLAttributes } from "react";

// eslint-disable-next-line
interface MovieInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MovieInput = ({ ...props }: MovieInputProps) => {
  return <input {...props} />;
};

export default MovieInput;
