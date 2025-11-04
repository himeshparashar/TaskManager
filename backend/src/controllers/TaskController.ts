import type { Request, Response } from 'express';
import type { ITaskController, ITaskService } from '../types/interfaces';
import type { CreateTaskDto, UpdateTaskDto } from '../types/Task';

export class TaskController implements ITaskController {
  constructor(private taskService: ITaskService) {}

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ success: false, message: 'Task ID is required' });
        return;
      }

      const task = await this.taskService.getTaskById(id);
      
      if (!task) {
        res.status(404).json({ success: false, message: 'Task not found' });
        return;
      }

      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch task' });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskData: CreateTaskDto = req.body;
      const newTask = await this.taskService.createTask(taskData);
      res.status(201).json({ success: true, data: newTask, message: 'Task created successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to create task' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTaskDto = req.body;
      
      if (!id) {
        res.status(400).json({ success: false, message: 'Task ID is required' });
        return;
      }

      const updatedTask = await this.taskService.updateTask(id, updateData);
      
      if (!updatedTask) {
        res.status(404).json({ success: false, message: 'Task not found' });
        return;
      }

      res.json({ success: true, data: updatedTask, message: 'Task updated successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to update task' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ success: false, message: 'Task ID is required' });
        return;
      }

      const deleted = await this.taskService.deleteTask(id);
      
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Task not found' });
        return;
      }

      res.json({ success: true, message: 'Task deleted successfully', data: { id } });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete task' });
    }
  }
}