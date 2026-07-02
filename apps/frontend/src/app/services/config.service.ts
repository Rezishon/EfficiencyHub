export const backendURL = 'http://localhost:3000/api';

export const endpoints = {
  TodoService: {
    GetTodoLists: `${backendURL}/todo/lists`,
    GetTodoList: `${backendURL}/todo/list`,
    AddTodoList: `${backendURL}/todo/list`,
    PatchTodoItem: `${backendURL}/todo/list`,
    AddTodoItem: `${backendURL}/todo/item`,
  },
};
