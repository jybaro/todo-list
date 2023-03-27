import { TaskService } from './tasks.service';
import { Task } from '../models/interfaces/task.interface';
import fetchMock from 'jest-fetch-mock';

jest.mock('node-fetch', () => fetchMock);
fetchMock.enableMocks();

describe('TaskService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('getAll', async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        description: 'Task 1',
        color: 'red',
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        zindex: '1',
        done: false,
        deleted: false,
        owner: 'owner-id',
      },
      {
        id: 2,
        description: 'Task 2',
        color: 'blue',
        left: 200,
        top: 200,
        width: 200,
        height: 100,
        zindex: '2',
        done: false,
        deleted: false,
        owner: 'owner-id',
      },
    ];

    fetchMock.mockResponse(JSON.stringify(mockTasks));

    const result = await TaskService.getAll({ queryKey: [null, 'owner-id'] });
    expect(result).toEqual(mockTasks);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('createTask', async () => {
    const newTask: Task = {
      description: 'Task 3',
      color: 'green',
      left: 300,
      top: 300,
      width: 200,
      height: 100,
      zindex: '3',
      done: false,
      deleted: false,
      owner: 'owner-id',
    };

    const createdTask = {
      ...newTask,
      id: 3,
    };

    fetchMock.mockResponse(JSON.stringify(createdTask));

    const result = await TaskService.createTask(newTask);
    expect(result).toEqual(createdTask);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('updateTask', async () => {
    const updatedTask: Task = {
      id: 1,
      description: 'Updated Task 1',
      color: 'yellow',
      left: 400,
      top: 400,
      width: 200,
      height: 100,
      zindex: '4',
      done: false,
      deleted: false,
      owner: 'owner-id',
    };

    fetchMock.mockResponse(JSON.stringify(updatedTask));

    const result = await TaskService.updateTask(updatedTask);
    expect(result).toEqual(updatedTask);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('completeTask', async () => {
    const taskToComplete: Task = {
      id: 1,
      description: 'Task 1',
      color: 'red',
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      zindex: '1',
      done: false,
      deleted: false,
      owner: 'owner-id',
    };

    const completedTask: Task = {
      ...taskToComplete,
      done: true,
    };

    fetchMock.mockResponse(JSON.stringify(completedTask));

    const result = await TaskService.completeTask(taskToComplete);
    expect(result).toEqual(completedTask);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('deleteTask', async () => {
    const taskToDelete: Task = {
      id: 1,
      description: 'Task 1',
      color: 'red',
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      zindex: '1',
      done: false,
      deleted: false,
      owner: 'owner-id',
    };

    const deletedTask: Task = {
      ...taskToDelete,
      deleted: true,
    };

    fetchMock.mockResponse(JSON.stringify(deletedTask));

    const result = await TaskService.deleteTask(taskToDelete);
    expect(result).toEqual(deletedTask);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
