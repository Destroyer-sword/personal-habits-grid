import { 
  subDays, 
  format, 
  eachDayOfInterval, 
  isSameDay, 
  parseISO, 
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek
} from 'date-fns';

// Generate mock completion data for the past 365 days
export const generateMockHistory = (habitId) => {
  const today = new Date();
  const startDate = subDays(today, 365);
  const days = eachDayOfInterval({ start: startDate, end: today });
  
  const history = {};
  days.forEach((day) => {
    // Random completion for demo purposes (~40% chance)
    if (Math.random() > 0.6) {
      const dateStr = format(day, 'yyyy-MM-dd');
      history[dateStr] = Math.floor(Math.random() * 3) + 1; // Level 1 to 3
    }
  });
  return history;
};

// Calculate current and longest streaks
export const calculateStreaks = (history) => {
  const dates = Object.keys(history)
    .filter((date) => history[date] > 0)
    .map((date) => parseISO(date))
    .sort((a, b) => b - a); // Descending order

  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const today = new Date();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Check current streak starting from today/yesterday
  let checkDate = today;
  let hasToday = dates.some((d) => isSameDay(d, checkDate));
  
  if (!hasToday) {
    checkDate = subDays(today, 1);
  }

  while (dates.some((d) => isSameDay(d, checkDate))) {
    currentStreak++;
    checkDate = subDays(checkDate, 1);
  }

  // Calculate longest streak across all recorded history
  const sortedAsc = [...dates].sort((a, b) => a - b);
  if (sortedAsc.length > 0) {
    tempStreak = 1;
    longestStreak = 1;

    for (let i = 1; i < sortedAsc.length; i++) {
      const diff = differenceInCalendarDays(sortedAsc[i], sortedAsc[i - 1]);
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else if (diff > 1) {
        tempStreak = 1;
      }
    }
  }

  return { currentStreak, longestStreak };
};

// Generate complete grid data (52 weeks matrix)
export const getGridData = () => {
  const today = new Date();
  const endDate = endOfWeek(today, { weekStartsOn: 0 });
  const startDate = startOfWeek(subDays(endDate, 364), { weekStartsOn: 0 });

  return eachDayOfInterval({ start: startDate, end: endDate });
};