import "./TodoButton.css";

interface TodoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const TodoButton: React.FC<TodoButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={className + " todo-inside-btn"} {...props}>
      {children}
    </button>
  );
};

export default TodoButton;
