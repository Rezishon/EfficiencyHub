import { Exclude, Expose, Type } from 'class-transformer';
import { TodoItem } from '../entities/todo-item.entity';

@Exclude()
export class TodoItems {
  @Expose()
  @Type(() => TodoItem)
  items: TodoItem[];
}
