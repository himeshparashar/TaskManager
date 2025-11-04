import type { Task } from '../types/Task';
import type { ITaskRepository } from '../types/interfaces';
import { INITIAL_TASKS } from '../constants/tasks';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [...INITIAL_TASKS];
  private nextId = 5;

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async findById(id: string): Promise<Task | null> {
    // todo
    return null;
  }

  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const newTask: Task = {
      id: this.nextId.toString(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      order: taskData.order,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.nextId++;
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    // todo
    return null;
  }

  async delete(id: string): Promise<boolean> {
    return true;
  }
}