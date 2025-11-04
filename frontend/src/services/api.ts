import axios from 'axios';
import type { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:3000/api';

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    const tasks = response.data?.data || response.data;
    return Array.isArray(tasks) ? tasks : [];
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, task);
    return response.data?.data || response.data;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updates);
    return response.data?.data || response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  },
};
