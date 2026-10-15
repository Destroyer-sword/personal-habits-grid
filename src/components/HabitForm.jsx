import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function HabitForm({ onAddHabit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Health');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddHabit({
      id: Date.now().toString(),
      title,
      category,
      createdAt: new Date().toISOString(),
      history: {},
    });

    setTitle('');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <PlusCircle size={18} /> New Habit
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-cyan-800 p-4 rounded-xl border border-gray-700 max-w-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-blue-300">Add New Habit</h3>
            <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Habit Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read 20 pages, Exercise..."
              className="w-full bg-sky-100 border border-sky-700 rounded-lg p-2 text-black focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-sky-100 border border-sky-700 rounded-lg p-2 text-black focus:outline-none focus:border-green-500"
            >
              <option value="Health">Health</option>
              <option value="Productivity">Productivity</option>
              <option value="Mindfulness">Mindfulness</option>
              <option value="Learning">Learning</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-sm bg-red-700 hover:bg-red-400 rounded-md text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-900 rounded-md text-white font-medium"
            >
              Save Habit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}