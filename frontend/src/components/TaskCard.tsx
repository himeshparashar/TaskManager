import type { Task } from '../types/Task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing"
    >
      <h3 className="text-gray-900 font-medium text-base mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
    </div>
  );
};
