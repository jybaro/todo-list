import { API_URL } from '../constants/env';
import { Task } from '../models/interfaces/task.interface';

const getAll = async (owner): Promise<Task[]> => {
  const response = await fetch(
    `${API_URL}/tasks/records?filter=(owner='${owner.queryKey[1]}')`
  );
  return response.json();
};
const createTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/records/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

const completeTask = async (task: Task): Promise<Task> => {
  return await updateTask({
    ...task,
    done: true,
  });
};

const deleteTask = async (task: Task): Promise<Task> => {
  return await updateTask({
    ...task,
    deleted: true,
  });
};

export const TaskService = {
  getAll,
  createTask,
  deleteTask,
  completeTask,
  updateTask,
};
