import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '../config.service';
import { IApiTodoItems, IApiTodoList, Imessage, IResponseType, ITodoItem } from '@shared-types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  getTodoLists() {
    return this.http.get<IResponseType<IApiTodoList[]>>(endpoints.TodoService.GetTodoLists);
  }

  getTodoList(listName: string) {
    return this.http.get<IResponseType<IApiTodoItems>>(
      `${endpoints.TodoService.GetTodoList}/${listName}`,
    );
  }

}
