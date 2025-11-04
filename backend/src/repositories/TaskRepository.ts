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
    const task = this.tasks.find(t => t.id === id);
    return task ? { ...task } : null;
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
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return null;
    }

    const existingTask = this.tasks[taskIndex]!;
    const updatedTask: Task = {
      id: existingTask.id,
      title: updates.title ?? existingTask.title,
      description: updates.description ?? existingTask.description,
      status: updates.status ?? existingTask.status,
      order: updates.order ?? existingTask.order,
      createdAt: existingTask.createdAt,
      updatedAt: new Date()
    };

    this.tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  }

  async delete(id: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}