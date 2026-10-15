import React from 'react';
import { Flame, Trophy, CheckCircle2 } from 'lucide-react';
import { calculateStreaks } from '../utils/habitUtils';

export default function HabitStats({ history }) {
  const { currentStreak, longestStreak } = calculateStreaks(history);
  const totalCompletions = Object.values(history).reduce((a, b) => a + (b > 0 ? 1 : 0), 0);

  return (
    <div className="grid grid-cols-3 gap-3 my-4">
      <div className="bg-orange-200 border border-gray-700/50 rounded-lg p-3 flex items-center gap-3">
        <Flame className="text-orange-500" size={24} />
        <div>
          <p className="text-xs text-gray-800">Current Streak</p>
          <p className="text-lg font-bold text-black">{currentStreak} Days</p>
        </div>
      </div>

      <div className="bg-amber-200 border border-gray-700/50 rounded-lg p-3 flex items-center gap-3">
        <Trophy className="text-yellow-500" size={24} />
        <div>
          <p className="text-xs text-gray-800">Longest Streak</p>
          <p className="text-lg font-bold text-black">{longestStreak} Days</p>
        </div>
      </div>

      <div className="bg-teal-200 border border-gray-700/50 rounded-lg p-3 flex items-center gap-3">
        <CheckCircle2 className="text-green-500" size={24} />
        <div>
          <p className="text-xs text-gray-800">Total Logged</p>
          <p className="text-lg font-bold text-black">{totalCompletions} Days</p>
        </div>
      </div>
    </div>
  );
}