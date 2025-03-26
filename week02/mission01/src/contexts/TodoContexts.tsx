import { createContext, useState, ReactNode } from "react";

import { Todo } from "../types/todo";

interface TodoContextProps {
  todoLists: Todo[];
  addTodo: (content: string) => void;
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);

  /**
   * @param {string} content - 할 일 내용
   */
  const addTodo = (content: string) => {
    setTodoLists((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: content,
        completed: false,
      },
    ]);
  };

  const completeTodo = (id: number) => {
    setTodoLists((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodoLists((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todoLists, addTodo, completeTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
