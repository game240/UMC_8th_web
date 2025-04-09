import "./TextField.css";

// interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      className="__text-field__ w-full h-10 rounded-[4px] p-2 mb-4 border-[1px] border-[#fff] bg-transparent"
      {...props}
    />
  );
};

export default TextField;
