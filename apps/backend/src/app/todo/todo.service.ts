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

}
