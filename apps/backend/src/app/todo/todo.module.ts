import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
  exports: [TodoService, PrismaService],
})
export class TodoModule {}
