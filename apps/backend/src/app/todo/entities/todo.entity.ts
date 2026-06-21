import { Exclude } from 'class-transformer';

export class Todo {
  id: string;

  @Exclude()
  value: object;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
