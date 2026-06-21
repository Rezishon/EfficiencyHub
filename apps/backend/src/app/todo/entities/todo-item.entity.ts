import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoItem {
  @Expose()
  id: string;

  @Expose()
  header: string;

  @Expose()
  body: string;

  @Expose()
  status: boolean;
}
