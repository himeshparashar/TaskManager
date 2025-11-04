export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'inprogress' | 'done';
