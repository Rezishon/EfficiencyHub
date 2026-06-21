import { ITodoItem } from '@riseof-website/shared-types';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoItem implements ITodoItem {
  @Expose()
  id: string;

  @Expose()
  header: string;

  @Expose()
  body: string;

  @Expose()
  status: boolean;
}
