import type { Task } from '../types/Task';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'inprogress' | 'done';
}

export const TaskColumn = ({ title, tasks, status }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-1 bg-gray-200 rounded-lg p-4 min-h-[500px] min-w-[300px]">
      <h2 className="text-gray-700 text-xl font-semibold text-center mb-4 pb-3 border-b-2 border-gray-300">
        {title}
      </h2>
      <SortableContext
        id={status}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-3 min-h-[400px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
