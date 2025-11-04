import type { Task } from '../types/Task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'inprogress' | 'done';
}

export const TaskColumn = ({ title, tasks }: TaskColumnProps) => {
  return (
    <div className="flex-1 bg-gray-200 rounded-lg p-4 min-h-[500px] min-w-[300px]">
      <h2 className="text-gray-700 text-xl font-semibold text-center mb-4 pb-3 border-b-2 border-gray-300">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
