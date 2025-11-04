import type { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-grab">
      <h3 className="text-gray-900 font-medium text-base mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
    </div>
  );
};
