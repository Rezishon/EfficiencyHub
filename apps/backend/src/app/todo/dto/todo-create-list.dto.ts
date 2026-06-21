import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoCreateList {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
