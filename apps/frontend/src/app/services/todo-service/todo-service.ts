import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '../config.service';
import { IApiTodoItems, IApiTodoList, Imessage, IResponseType, ITodoItem } from '@shared-types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

}
