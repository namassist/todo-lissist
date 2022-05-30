const STORAGE_KEY = "TODO_APPS";

let todos = [];

const isStorageExist = () => {
  if (typeof Storage === "undefined") {
    alert("Browser tidak mendukung web storage!");
    return false;
  }
  return true;
};

const saveData = () => {
  const parsed = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    todos = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
};

const updateDataToStorage = () => {
  if (isStorageExist()) {
    saveData();
  }
};

const composeTodoObject = (task, timestamp, isCompleted) => {
  return {
    id: +new Date(),
    task,
    timestamp,
    isCompleted,
  };
};

const findTodo = (todoId) => {
  for (const todo of todos) {
    if (todo.id === todoId) return todo;
  }
  return null;
};

const findTodoIndex = (todoId) => {
  let index = 0;
  for (const todo of todos) {
    if (todo.id === todoId) return index;

    index++;
  }

  return -1;
};

const refreshDataFromTodos = () => {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

  for (todo of todos) {
    const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
    newTodo[TODO_ITEMID] = todo.id;

    if (todo.isCompleted) {
      listCompleted.append(newTodo);
    } else {
      listUncompleted.append(newTodo);
    }
  }
};
