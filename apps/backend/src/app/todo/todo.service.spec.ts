import 'reflect-metadata';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockPrismaService = {
    todoList: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    service = new TodoService(mockPrismaService as unknown as PrismaService);
    jest.clearAllMocks();
  });

  it('should successfully filter and remove an item from a list array', async () => {
    mockPrismaService.todoList.findUnique.mockResolvedValue({
      name: 'testList',
      items: [
        { id: '1', header: 'Delete Me' },
        { id: '2', header: 'Keep Me' },
      ],
    });
    mockPrismaService.todoList.update.mockResolvedValue({});

    await service.deleteItem('testList', '1');

    expect(mockPrismaService.todoList.update).toHaveBeenCalledWith({
      where: { name: 'testList' },
      data: {
        items: [{ id: '2', header: 'Keep Me' }], // Expects item '1' to be cleanly removed
      },
    });
  });
});
