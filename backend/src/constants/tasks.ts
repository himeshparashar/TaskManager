import type { Task } from '../types/Task';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Setup Project Structure',
    description: 'Initialize the project with proper folder structure',
    status: 'done',
    order: 1,
    createdAt: new Date('2025-11-04T10:00:00Z'),
    updatedAt: new Date('2025-11-04T10:00:00Z')
  },
  {
    id: '2',
    title: 'Create API Routes',
    description: 'Implement CRUD operations for tasks',
    status: 'inprogress',
    order: 1,
    createdAt: new Date('2025-11-04T11:00:00Z'),
    updatedAt: new Date('2025-11-04T11:00:00Z')
  },
  {
    id: '3',
    title: 'Build Frontend UI',
    description: 'Create React components for task management',
    status: 'todo',
    order: 1,
    createdAt: new Date('2025-11-04T12:00:00Z'),
    updatedAt: new Date('2025-11-04T12:00:00Z')
  },
  {
    id: '4',
    title: 'Add Drag and Drop',
    description: 'Implement drag and drop functionality for task cards',
    status: 'todo',
    order: 2,
    createdAt: new Date('2025-11-04T13:00:00Z'),
    updatedAt: new Date('2025-11-04T13:00:00Z')
  }
];
