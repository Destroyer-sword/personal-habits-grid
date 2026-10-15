import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";
import { generateMockHistory } from "./utils/habitUtils";
import { Activity } from "lucide-react";

const INITIAL_HABITS = [
  {
    id: "1",
    title: "Daily Coding & Open Source",
    category: "Productivity",
    createdAt: new Date().toISOString(),
    history: generateMockHistory("1"),
  },
  {
    id: "2",
    title: "30 Mins Daily Exercise",
    category: "Health",
    createdAt: new Date().toISOString(),
    history: generateMockHistory("2"),
  },
];

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits_data");
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  useEffect(() => {
    localStorage.setItem("habits_data", JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (newHabit) => {
    setHabits([newHabit, ...habits]);
  };

  const handleToggleToday = (habitId) => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    handleToggleDay(
      habitId,
      todayStr,
      habits.find((h) => h.id === habitId)?.history[todayStr] || 0,
    );
  };

  // NEW: Handler for clicking ANY date on the grid
  const handleToggleDay = (habitId, dateStr, currentLevel) => {
    const nextLevel = (currentLevel + 1) % 5; // Cycles 0 -> 1 -> 2 -> 3 -> 4 -> 0

    setHabits(
      habits.map((h) => {
        if (h.id === habitId) {
          const updatedHistory = { ...h.history };
          if (nextLevel === 0) {
            delete updatedHistory[dateStr];
          } else {
            updatedHistory[dateStr] = nextLevel;
          }
          return { ...h, history: updatedHistory };
        }
        return h;
      }),
    );
  };

  const handleDelete = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId));
  };

  return (
    <div className="min-h-screen bg-sky-950 text-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center border-b border-white pb-4">
          <div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-cyan-400 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 inline-block shrink-0" />
              <span className="whitespace-normal break-words">
                Personal <span className="text-green-500">Habits</span> Tracker
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Code your habits. Track your grind. Build your streak.
            </p>
          </div>
        </header>

        <HabitForm onAddHabit={handleAddHabit} />

        {habits.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-xl">
            <p className="text-gray-400">
              No habits tracked yet. Add one above to get started!
            </p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleToday={handleToggleToday}
              onToggleDay={(dateStr, level) =>
                handleToggleDay(habit.id, dateStr, level)
              }
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
