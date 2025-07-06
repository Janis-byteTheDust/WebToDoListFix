'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import TaskForm from './components/taskform';
import TaskList from './components/tasklist';

type Task = {
  id: number;
  text: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  image?: string;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Sulit'>('Mudah');
  const [image, setImage] = useState<File | null>(null);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const formData = new FormData();
    formData.append('text', newTask);
    formData.append('difficulty', difficulty);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.task) {
      setTasks([data.task, ...tasks]);
      setNewTask('');
      setDifficulty('Mudah');
      setImage(null);
    }
  };

   const deleteTask = async (id: number) => {
    await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center relative">
      {/* Tombol Logout */}
      <button
        onClick={() => signOut()}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">To-Do List</h1>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        addTask={addTask}
        image={image}
        setImage={setImage}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </main>
  );
}