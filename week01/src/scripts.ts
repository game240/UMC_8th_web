const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoListItems = document.getElementById("todo-list-items") as HTMLDivElement;
const todoCompletedItems = document.getElementById("todo-completed-items") as HTMLDivElement;

// { id: 1, content: "TS", completed: false }
type Todo = {
  id: number;
  content: string;
  completed: boolean;
};
let todoLists: Todo[] = [];

// submit btn event
todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // refresh 방지

  // input 입력
  const text = todoInput.value;
  // 비어있을 경우 todo list 생성 X
  if (!text) {
    return;
  }

  todoLists.push({
    id: todoLists.length + 1,
    content: text,
    completed: false,
  });
  // input init
  todoInput.value = "";

  renderTodo();
});

// todo item 생성
// <div class="todo-item">
//   <p>매튜</p>
//   <button class="todo-list-btn green-btn">완료</button>
// </div>;

// <div class="todo-item">
//     <p>매튜</p>
//     <button class="todo-completed-btn red-btn">삭제</button>
// </div>
const createTodoItem = (todo: Todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const p = document.createElement("p");
  p.textContent = todo.content;
  todoItem.appendChild(p);

  const button = document.createElement("button");
  if (todo.completed === false) {
    button.classList.add("todo-list-btn", "green-btn");
    button.textContent = "완료";
    button.onclick = () => onClickComplete(todo.id);
  } else {
    button.classList.add("todo-completed-btn", "red-btn");
    button.textContent = "삭제";
    button.onclick = () => onClickRemove(todo.id);
  }
  todoItem.appendChild(button);

  return todoItem;
};

// todo 완료 버튼
const onClickComplete = (id: number) => {
  //   const todo = todoLists.find((todo) => todo.id === id); // 컴파일 옵션 수정을 못해서 [].find()를 못써요...
  const todo = todoLists.filter((todo) => todo.id === id)[0];
  if (todo) {
    todo.completed = true;
  }
  renderTodo();
};

// 완료된 todo 삭제 버튼
const onClickRemove = (id: number) => {
  todoLists = todoLists.filter((todo) => todo.id !== id);
  renderTodo();
};

const renderTodo = () => {
  todoListItems.innerHTML = "";
  todoCompletedItems.innerHTML = "";

  todoLists.forEach((todo) => {
    if (todo.completed === false) {
      todoListItems.appendChild(createTodoItem(todo));
    } else {
      todoCompletedItems.appendChild(createTodoItem(todo));
    }
  });
};
