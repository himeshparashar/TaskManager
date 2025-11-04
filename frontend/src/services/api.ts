import axios from 'axios';
import type { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:3000/api';

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    const tasks = response.data?.data || response.data;
    return Array.isArray(tasks) ? tasks : [];
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updates);
    return response.data?.data || response.data;
  },
};
