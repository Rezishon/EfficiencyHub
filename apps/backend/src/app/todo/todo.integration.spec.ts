import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TodoModule } from './todo.module';
import { PrismaService } from '../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('Todo System Integration', () => {
  let app: INestApplication;
  const serverUrl = 'http://localhost:3000/api';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, CacheModule.register()],
      providers: [PrismaService, TodoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.listen(0);
  });

  beforeEach(async () => {
    const prisma = app.get(PrismaService);
    await prisma.todoList.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create and get list', async () => {
    const createPayload = { listName: 'testList' };

    const postResponse = await fetch(`${serverUrl}/todo/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload),
    });

    expect(postResponse.status).toBe(201);

    const getResponse = await fetch(`${serverUrl}/todo/lists`);
    expect(getResponse.status).toBe(200);
  });
});
