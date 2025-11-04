export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'todo' | 'inprogress' | 'done';
