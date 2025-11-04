import express from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../services/TaskService';
import { InMemoryTaskRepository } from '../repositories/TaskRepository';

const router = express.Router();

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.get('/', async (req, res) => {
  await taskController.getAllTasks(req, res);
});

router.get('/:id', async (req, res) => {
  await taskController.getTaskById(req, res);
});

router.post('/', async (req, res) => {
  await taskController.createTask(req, res);
});

router.put('/:id', async (req, res) => {
  await taskController.updateTask(req, res);
});

router.delete('/:id', async (req, res) => {
  await taskController.deleteTask(req, res);
});

export default router;