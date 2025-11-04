import type { Task } from '../types/Task';
import type { ITaskRepository } from '../types/interfaces';
import { INITIAL_TASKS } from '../constants/tasks';
import { prisma } from '../database/database';

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

export class PrismaTaskRepository implements ITaskRepository {
  async findAll(): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    return tasks as Task[];
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id }
    });
    return task as Task | null;
  }

  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        order: taskData.order
      }
    });
    return task as Task;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    try {
      const task = await prisma.task.update({
        where: { id },
        data: {
          ...(updates.title && { title: updates.title }),
          ...(updates.description && { description: updates.description }),
          ...(updates.status && { status: updates.status }),
          ...(updates.order !== undefined && { order: updates.order })
        }
      });
      return task as Task;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.task.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
