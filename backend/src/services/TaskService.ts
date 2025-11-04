import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';
import type { ITaskService, ITaskRepository } from '../types/interfaces';

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const existingTasks = await this.taskRepository.findAll();
    const status = data.status || 'todo';
    const tasksInStatus = existingTasks.filter(t => t.status === status);
    const order = tasksInStatus.length + 1;

    const taskData = {
      title: data.title,
      description: data.description || '',
      status,
      order
    };

    return await this.taskRepository.create(taskData);
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task | null> {
    const updateData: Partial<Task> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.order !== undefined) updateData.order = data.order;

    return await this.taskRepository.update(id, updateData);
  }

  async deleteTask(id: string): Promise<boolean> {
    return await this.taskRepository.delete(id);
  }
}