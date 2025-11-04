import type { Request, Response } from 'express';
import type { Task, CreateTaskDto, UpdateTaskDto } from './Task';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  update(id: string, updates: Partial<Task>): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}

export interface ITaskService {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(data: CreateTaskDto): Promise<Task>;
  updateTask(id: string, data: UpdateTaskDto): Promise<Task | null>;
  deleteTask(id: string): Promise<boolean>;
}

export interface ITaskController {
  getAllTasks(req: Request, res: Response): Promise<void>;
  getTaskById(req: Request, res: Response): Promise<void>;
  createTask(req: Request, res: Response): Promise<void>;
  updateTask(req: Request, res: Response): Promise<void>;
  deleteTask(req: Request, res: Response): Promise<void>;
}