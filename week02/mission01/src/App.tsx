import { useState } from "react";

import TodoButton from "./components/TodoButton";
import TodoList from "./components/TodoList";

import { Todo } from "./types/todo";

import "./App.css";
import "./styles/button.css";

function App() {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      return;
    }
    setTodoLists([
      ...todoLists,
      {
        id: todoLists.length + 1,
        content: text,
        completed: false,
      },
    ]);
    setText("");
  };

  const onClickComplete = (id: number) => {
    setTodoLists(
      todoLists.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: true,
          };
        }
        return item;
      })
    );
  };

  const onClickRemove = (id: number) => {
    setTodoLists(
      todoLists.filter((item) => {
        return item.id !== id;
      })
    );
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
                          onClickComplete(todo.id);
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
                          onClickRemove(todo.id);
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
