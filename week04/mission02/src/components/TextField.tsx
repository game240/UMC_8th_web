interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const TextField: React.FC<TextFieldProps> = ({ error, helperText = "", ...props }) => {
  return (
    <div className="w-full">
      <input
        className="__text-field__ w-full h-10 rounded-[4px] p-2 mb-4 border-[1px] border-[#fff] bg-transparent"
        {...props}
      />
      {error && <p className="text-red-600 text-xs">{helperText}</p>}
    </div>
  );
};

export default TextField;
