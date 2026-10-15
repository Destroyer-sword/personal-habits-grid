import React, { useState } from "react";
import {
  format,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  subDays,
  eachDayOfInterval,
  parseISO,
} from "date-fns";

export default function ContributionGrid({ history, onDayClick }) {
  const today = new Date();
  const endDate = endOfWeek(today, { weekStartsOn: 0 });
  const startDate = startOfWeek(subDays(endDate, 364), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const [hoveredDay, setHoveredDay] = useState(null);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getCellColor = (level) => {
    switch (level) {
      case 1:
        return "bg-github-level1 border-green-900";
      case 2:
        return "bg-github-level2 border-green-800";
      case 3:
        return "bg-github-level3 border-green-600";
      case 4:
        return "bg-github-level4 border-green-400";
      default:
        return "bg-github-empty border-gray-800/50";
    }
  };

  return (
    <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl border border-gray-800 my-4 w-full overflow-hidden">
      <div className="w-full overflow-x-auto touch-pan-x pb-4 custom-mobile-scrollbar sm:no-scrollbar">
        <div className="flex gap-[3px] sm:gap-[4px] w-max sm:mx-auto pr-4 sm:pr-0">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between pt-5 pb-1 text-[9px] sm:text-[12px] text-white pr-1 select-none font-mono sticky left-0 sm:bg-transparent z-10">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Week Columns */}
          {weeks.map((week, weekIdx) => {
            const firstDayOfWeek = week[0];
            const prevWeekFirstDay = weekIdx > 0 ? weeks[weekIdx - 1][0] : null;
            const showMonth =
              weekIdx === 0 || !isSameMonth(firstDayOfWeek, prevWeekFirstDay);

            return (
              <div
                key={weekIdx}
                className="flex flex-col gap-[3px] sm:gap-[4px]"
              >
                {/* Month Label Header */}
                <div className="h-5 text-[9px] sm:text-[15px] text-white font-sans relative">
                  {showMonth && (
                    <span className="absolute top-0 left-0 whitespace-nowrap">
                      {format(firstDayOfWeek, "MMM")}
                    </span>
                  )}
                </div>

                {/* 7 Days Grid */}
                {week.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const level = history[dateStr] || 0;

                  return (
                    <button
                      type="button"
                      key={dateStr}
                      onClick={() => onDayClick && onDayClick(dateStr, level)}
                      onMouseEnter={() =>
                        setHoveredDay({ date: dateStr, count: level })
                      }
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] border ${getCellColor(
                        level
                      )} transition-colors cursor-pointer hover:ring-1 hover:ring-amber-500 focus:outline-none`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Tooltip */}
      <div className="h-6 mt-2 text-center">
        {hoveredDay ? (
          <span className="text-xs text-gray-300 bg-gray-800 border border-gray-700 px-3 py-1 rounded shadow-md inline-block">
            <span className="font-semibold text-white">
              {hoveredDay.count} completions
            </span>{" "}
            on {format(parseISO(hoveredDay.date), "MMM d, yyyy")}
          </span>
        ) : (
          <span className="text-xs text-amber-400">
            Click any square to mark or toggle completions
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 text-xs text-gray-400 mt-2">
        <span>Less</span>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-github-empty border border-gray-800"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-github-level1"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-github-level2"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-github-level3"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] bg-github-level4"></div>
        <span>More</span>
      </div>
    </div>
  );
}