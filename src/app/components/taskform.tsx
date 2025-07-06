'use client';

import { useState, useEffect } from 'react';

type TaskFormProps = {
  newTask: string;
  setNewTask: (value: string) => void;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  setDifficulty: (value: 'Mudah' | 'Sedang' | 'Sulit') => void;
  addTask: () => void;
  image: File | null;
  setImage: (file: File | null) => void;
};

export default function TaskForm({
  newTask,
  setNewTask,
  difficulty,
  setDifficulty,
  addTask,
  image,
  setImage,
}: TaskFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Preview file image
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow-lg transition duration-300">
      {/* Input teks tugas */}
      <div className="relative w-64">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas..."
          className="px-4 py-2 rounded border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
        />
      </div>

      {/* Dropdown kesulitan */}
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as 'Mudah' | 'Sedang' | 'Sulit')}
        className="px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
      >
        <option value="Mudah">Mudah</option>
        <option value="Sedang">Sedang</option>
        <option value="Sulit">Sulit</option>
      </select>

      {/* Input file */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
        file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
        transition duration-300"
      />

      {/* Tombol tambah */}
      <button
        onClick={addTask}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded hover:shadow-lg transition duration-300 hover:bg-gradient-to-l"
      >
        Tambah
      </button>

      {/* Pratinjau gambar */}
      {preview && (
        <div className="mt-2 w-20 h-20 border rounded overflow-hidden shadow">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
