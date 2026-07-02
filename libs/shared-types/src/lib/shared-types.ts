export interface ITodoList {
  listName: string;
  listItem?: ITodoItem;
}
export interface ITodoItem {
  id: string;
  header: string;
  body: string;
  status: boolean;
}

export interface IResponseType<T> {
  data: T;
}
