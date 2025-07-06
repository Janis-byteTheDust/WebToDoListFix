'use client';

type Task = {
  id: number;
  text: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  image?: string; // Tambahan untuk mendukung gambar
};

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: number) => void;
};

export default function TaskList({ tasks, deleteTask }: TaskListProps) {
  return (
    <ul className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-lg space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-black"
        >
          <div className="flex items-start gap-4">
            {task.image && (
              <img
                src={task.image}
                alt="Task"
                className="w-20 h-20 object-cover rounded-md border border-gray-300"
              />
            )}
            <div>
              <div className="font-semibold text-lg">{task.text}</div>
              <div className="text-sm text-gray-600">
                Kesulitan: {task.difficulty}
              </div>
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </li>
      ))}
    </ul>
  );
}
