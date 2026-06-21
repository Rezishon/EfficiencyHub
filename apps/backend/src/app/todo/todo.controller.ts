import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Todo } from './entities/todo.entity';
import { plainToInstance } from 'class-transformer';
import { message, ResponseType } from '../response-type/response-type.dto';
import { TodoList } from './dto/todo-list.dto';
import { TodoItems } from './dto/todo-items.dto';
import { TodoCreateList } from './dto/todo-create-list.dto';


@Controller('todo')
export class TodoController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly todoService: TodoService,
  ) {}

  @Post('list')
  async createList(@Body() model: ITodoList) {
    const result = await this.todoService.createList(model);
    return plainToInstance(TodoCreateList, result);
  }

  @Get('lists')
  async getLists(): Promise<TodoList[]> {
    const result = await this.todoService.findAllLists();
    return plainToInstance(TodoList, result);
  }

  @Get('list/:name')
  async getList(@Param('name') name: string) {
    const result = await this.todoService.findOneList(name);
    return plainToInstance(TodoItems, result);
  }

  @Delete('list/:name')
  async deleteList(@Param('name') name: string) {
    return await this.todoService.deleteList(name);
  }

  @Post('item')
  async addItem(@Body() model: ITodoList) {
    return await this.todoService.addItem(model);
  }

  @Delete('list/:name/item/:id')
  async deleteItem(@Param('name') name: string, @Param('id') id: string) {
    return await this.todoService.deleteItem(name, id);
  }

}
