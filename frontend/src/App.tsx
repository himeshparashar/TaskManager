
import './App.css';
import { useState } from 'react';
import { TaskColumn } from './components/TaskColumn';
import { INITIAL_TASKS } from './constants/tasks';
import type { Task, TaskStatus } from './types/Task';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { TaskCard } from './components/TaskCard';

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'inprogress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const isOverColumn = ['todo', 'inprogress', 'done'].includes(overId as string);
    
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === activeId ? { ...task, status: newStatus } : task
          )
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if dropped on a column
    const isOverColumn = ['todo', 'inprogress', 'done'].includes(overId as string);
    
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-100 p-5 w-screen">
        <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">Task Manager</h1>
        <div className="flex gap-5 max-w-[1400px] mx-auto justify-center">
          <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
          <TaskColumn title="In Progress" tasks={inProgressTasks} status="inprogress" />
          <TaskColumn title="Done" tasks={doneTasks} status="done" />
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
