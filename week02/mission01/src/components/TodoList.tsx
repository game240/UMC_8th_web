import { Todo } from "../types/todo";

interface TodoListProps {
  todoLists: Todo[];
  condition: "proceeding" | "completed";
  renderButton: (todo: Todo) => React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = ({ todoLists, condition, renderButton }) => {
  return todoLists
    .filter((todo) => (condition === "proceeding" ? !todo.completed : todo.completed))
    .map((todo) => (
      <div className="todo-item" key={todo.id}>
        <p>{todo.content}</p>

        {renderButton(todo)}
      </div>
    ));
};

export default TodoList;
