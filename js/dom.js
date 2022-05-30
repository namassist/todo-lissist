const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

const makeTodo = (dataTitle, datatimeStamp, isCompleted) => {
  const title = document.createElement("h2");
  title.innerText = dataTitle;

  const timeStamp = document.createElement("p");
  timeStamp.innerText = datatimeStamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(title, timeStamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton());
  }

  return container;
};

const createUndoButton = () => {
  return createButton("undo-button", function (event) {
    undoTaskCompleted(event.target.parentElement);
  });
};

const createTrashButton = () => {
  return createButton("trash-button", function (event) {
    removeTaskCompleted(event.target.parentElement);
  });
};

const createCheckButton = () => {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
};

const createButton = (buttonTypeClass, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
};

const addTodo = () => {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

  const title = document.getElementById("title").value;
  const timeStamp = document.getElementById("date").value;

  const todo = makeTodo(title, timeStamp, false);
  const todoObject = composeTodoObject(title, timeStamp, false);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);

  uncompletedTODOList.append(todo);
  updateDataToStorage();
};

const addTaskToCompleted = (taskElement) => {
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
  const title = document.querySelector(".inner > h2").innerText;
  const timeStamp = document.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(title, timeStamp, true);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  listCompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
};

const removeTaskCompleted = (taskElement) => {
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();
  updateDataToStorage();
};

const undoTaskCompleted = (taskElement) => {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const tasktimeStamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, tasktimeStamp, false);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo);
  taskElement.remove();
  updateDataToStorage();
};
