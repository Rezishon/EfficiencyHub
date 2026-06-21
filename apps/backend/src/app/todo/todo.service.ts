import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITodoItem, ITodoList } from '@shared-types';
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

  async deleteItem(listName: string, id: string) {
    const result = await this.prisma.todoList.findUnique({
      where: {
        name: listName,
      },
      select: {
        items: true,
      },
    });
    HasValue(result);

    const items = (result.items ?? []) as unknown as ITodoItem[];
    const updatedValue = items.filter((item) => item.id !== id);

    await this.prisma.todoList.update({
      where: {
        name: listName,
      },
      data: {
        items: updatedValue as any,
      },
    });

    return MessageHandler('Data deleted!');
  }

  async updateItem(listName: string, model: ITodoItem) {
    const result = await this.prisma.todoList.findUnique({
      where: {
        name: listName,
      },
      select: {
        items: true,
      },
    });
    HasValue(result);

    const items = (result.items ?? []) as unknown as ITodoItem[];

    const isItemExist = items.find((item) => item.id === model.id);
    HasValue(isItemExist);

    const updatedValue = items.map((item) => {
      if (item.id === model.id) {
        item = model;
        return item;
      }
      return item;
    });

    await this.prisma.todoList.update({
      where: {
        name: listName,
      },
      data: {
        items: updatedValue as any,
      },
    });

    return updatedValue;
  }
}
