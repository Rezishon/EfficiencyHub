import { IApiTodoList } from '@riseof-website/shared-types';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoList implements IApiTodoList {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
