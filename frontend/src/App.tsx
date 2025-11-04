
import './App.css';
import { useState, useEffect } from 'react';
import { TaskColumn } from './components/TaskColumn';
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
import { taskApi } from './services/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

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
    const { over } = event;
    if (!over) return;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    let newStatus: TaskStatus | null = null;
    
    if (['todo', 'inprogress', 'done'].includes(overId as string)) {
      newStatus = overId as TaskStatus;
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (!newStatus || activeTask.status === newStatus) {
      return;
    }

    const previousTasks = [...tasks];

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === activeId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await taskApi.updateTask(activeId as string, { status: newStatus });
    } catch (error) {
      console.error('Error updating task:', error);
      setTasks(previousTasks);
      alert('Failed to update task. Please try again.');
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
        {loading ? (
          <div className="text-center text-gray-600 text-xl">Loading tasks...</div>
        ) : (
          <div className="flex gap-5 max-w-[1400px] mx-auto justify-center">
            <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
            <TaskColumn title="In Progress" tasks={inProgressTasks} status="inprogress" />
            <TaskColumn title="Done" tasks={doneTasks} status="done" />
          </div>
        )}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
