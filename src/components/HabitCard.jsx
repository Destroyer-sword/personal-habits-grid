import React from 'react';
import { format } from 'date-fns';
import { Check, Trash2 } from 'lucide-react';
import ContributionGrid from './ContributionGrid';
import HabitStats from './HabitStats';

export default function HabitCard({ habit, onToggleToday, onToggleDay, onDelete }) {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const isCompletedToday = (habit.history[todayStr] || 0) > 0;

  return (
    <div className="bg-sky-700 border border-gray-700 rounded-xl p-5 mb-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gray-700 text-green-400">
            {habit.category}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">{habit.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleToday(habit.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isCompletedToday
                ? 'bg-green-600 hover:bg-green-900 text-white'
                : 'bg-red-700 hover:bg-red-400 text-gray-200'
            }`}
          >
            <Check size={18} />
            {isCompletedToday ? 'Completed Today' : 'Mark Done Today'}
          </button>

          <button
            onClick={() => onDelete(habit.id)}
            className="text-gray-900 hover:text-red-700 p-2 transition"
            title="Delete Habit"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <HabitStats history={habit.history} />
      
      {/* Pass onToggleDay handler down to ContributionGrid */}
      <ContributionGrid 
        history={habit.history} 
        onDayClick={onToggleDay} 
      />
    </div>
  );
}