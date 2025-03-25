import { useContext, useState } from "react";

import TodoButton from "./components/TodoButton";
import TodoList from "./components/TodoList";

import TodoContext from "./contexts/TodoContexts";

import { Todo } from "./types/todo";

import "./App.css";
import "./styles/button.css";

function App() {
  const [text, setText] = useState<string>("");

  const { todoLists, addTodo, completeTodo, removeTodo } = useContext(TodoContext)!;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      return;
    }
    addTodo(text);
    setText("");
  };

  return (
    <div className="App">
      <div className="todo-wrap">
        <div className="todo">
          <h1>TODO</h1>

          <form id="todo-form" className="todo-form" onSubmit={onSubmit}>
            <input
              type="text"
              id="todo-input"
              placeholder="할 일 입력"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <button type="submit" className="green-btn">
              할 일 추가
            </button>
          </form>

          <section className="todo-contents">
            <section className="todo-list">
              <h2>할 일</h2>
              <div className="todo-item-wrap">
                <TodoList
                  todoLists={todoLists}
                  condition="proceeding"
                  renderButton={(todo: Todo) => {
                    return (
                      <TodoButton
                        className="green-btn"
                        onClick={() => {
                          completeTodo(todo.id);
                        }}
                      >
                        완료
                      </TodoButton>
                    );
                  }}
                />
              </div>
            </section>
            <section className="todo-list">
              <h2>완료</h2>
              <div className="todo-item-wrap">
                <TodoList
                  todoLists={todoLists}
                  condition="completed"
                  renderButton={(todo: Todo) => {
                    return (
                      <TodoButton
                        className="red-btn"
                        onClick={() => {
                          removeTodo(todo.id);
                        }}
                      >
                        삭제
                      </TodoButton>
                    );
                  }}
                />
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
