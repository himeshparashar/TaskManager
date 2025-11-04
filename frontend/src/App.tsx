
import './App.css';
import { TaskColumn } from './components/TaskColumn';
import type { Task } from './types/Task';

function App() {
  const todoTasks: Task[] = [];
  const inProgressTasks: Task[] = [];
  const doneTasks: Task[] = [];

  return (
    <div className="min-h-screen bg-gray-100 p-5 w-screen">
      <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">Task Manager</h1>
      <div className="flex gap-5 max-w-[1400px] mx-auto justify-center">
        <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
        <TaskColumn title="In Progress" tasks={inProgressTasks} status="inprogress" />
        <TaskColumn title="Done" tasks={doneTasks} status="done" />
      </div>
    </div>
  );
}

export default App;
