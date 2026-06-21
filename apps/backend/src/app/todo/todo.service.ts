import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma.service';
import { ITodoItem, ITodoList } from './todo.controller';
import { message } from '../response-type/response-type.dto';
import { HasValue } from '../utils/error-handler';
import { MessageHandler } from '../utils/message-handler';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createList(model: ITodoList) {
    return await this.prisma.todoList.create({
      data: {
        name: model.listName,
        items: [],
      },
    });
  }

  async addItem(model: ITodoList): Promise<message> {
    const result = await this.prisma.todoList.findUnique({
      where: {
        name: model.listName,
      },
      select: {
        items: true,
      },
    });
    HasValue(result, model.listName);
    model.listItem.id = randomUUID();

    const updatedValue = [...((result.items ?? []) as unknown as ITodoItem[]), model.listItem];

    await this.prisma.todoList.update({
      where: {
        name: model.listName,
      },
      data: {
        name: model.listName,
        items: updatedValue as any,
      },
    });

    return MessageHandler('Data saved!');
  }

  async findAllLists() {
    const result = await this.prisma.todoList.findMany();
    HasValue(result);
    return result;
  }

  async findOneList(listName: string) {
    const result = await this.prisma.todoList.findUnique({
      where: {
        name: listName,
      },
    });
    HasValue(result);
    return result;
  }

  async deleteList(listName: string) {
    await this.prisma.todoList.delete({
      where: {
        name: listName,
      },
    });

    return MessageHandler('Data deleted!');
  }

}
