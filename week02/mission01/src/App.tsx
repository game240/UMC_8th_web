import { useState } from "react";

import "./App.css";
import "./styles/button.css";

// { id: 1, content: "TS", completed: false }
type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

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
              <div id="todo-list-items" className="todo-item-wrap">
                {
                  // completed가 false인 경우
                  todoLists
                    .filter((todo) => !todo.completed)
                    .map((todo) => (
                      <div className="todo-item" key={todo.id}>
                        <p>{todo.content}</p>
                        <button
                          className="todo-list-btn green-btn"
                          onClick={() => {
                            setTodoLists(
                              todoLists.map((item) => {
                                if (item.id === todo.id) {
                                  return {
                                    ...item,
                                    completed: true,
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        >
                          완료
                        </button>
                      </div>
                    ))
                }
              </div>
            </section>
            <section className="todo-completed">
              <h2>완료</h2>
              <div id="todo-completed-items" className="todo-item-wrap">
                {
                  // completed가 true인 경우
                  todoLists
                    .filter((todo) => todo.completed)
                    .map((todo) => (
                      <div className="todo-item" key={todo.id}>
                        <p>{todo.content}</p>
                        <button
                          className="todo-completed-btn red-btn"
                          onClick={() => {
                            setTodoLists(
                              todoLists.filter((item) => {
                                return item.id !== todo.id;
                              })
                            );
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ))
                }
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
