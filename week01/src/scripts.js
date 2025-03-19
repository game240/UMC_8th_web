var todoForm = document.getElementById("todo-form");
var todoInput = document.getElementById("todo-input");
var todoListItems = document.getElementById("todo-list-items");
var todoCompletedItems = document.getElementById("todo-completed-items");
var todoLists = [];
// submit btn event
todoForm.addEventListener("submit", function (event) {
    event.preventDefault(); // refresh 방지
    // input 입력
    var text = todoInput.value;
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
var createTodoItem = function (todo) {
    var todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    var p = document.createElement("p");
    p.textContent = todo.content;
    todoItem.appendChild(p);
    var button = document.createElement("button");
    if (todo.completed === false) {
        button.classList.add("todo-list-btn", "green-btn");
        button.textContent = "완료";
        button.onclick = function () { return onClickComplete(todo.id); };
    }
    else {
        button.classList.add("todo-completed-btn", "red-btn");
        button.textContent = "삭제";
        button.onclick = function () { return onClickRemove(todo.id); };
    }
    todoItem.appendChild(button);
    return todoItem;
};
// todo 완료 버튼
var onClickComplete = function (id) {
    //   const todo = todoLists.find((todo) => todo.id === id); // 컴파일 옵션 수정을 못해서 [].find()를 못써요...
    var todo = todoLists.filter(function (todo) { return todo.id === id; })[0];
    if (todo) {
        todo.completed = true;
    }
    renderTodo();
};
// 완료된 todo 삭제 버튼
var onClickRemove = function (id) {
    todoLists = todoLists.filter(function (todo) { return todo.id !== id; });
    renderTodo();
};
var renderTodo = function () {
    todoListItems.innerHTML = "";
    todoCompletedItems.innerHTML = "";
    todoLists.forEach(function (todo) {
        if (todo.completed === false) {
            todoListItems.appendChild(createTodoItem(todo));
        }
        else {
            todoCompletedItems.appendChild(createTodoItem(todo));
        }
    });
};
