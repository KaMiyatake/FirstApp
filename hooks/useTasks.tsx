import React, { createContext, useContext, useState } from 'react';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TasksContextValue {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) =>
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const removeTask = (id: number) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within TasksProvider');
  return ctx;
}
