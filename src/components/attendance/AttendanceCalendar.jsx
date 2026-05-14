import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const AttendanceCalendar = () => {
  const { user } = useAuth();
  const { attendance } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const attendanceMap = useMemo(() => {
    const map = {};
    if (Array.isArray(attendance)) {
      attendance.forEach((a) => {
        if (a.userId === user?.id) {
          map[a.date] = a;
        }
      });
    }
    return map;
  }, [attendance, user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-emerald-500';
      case 'Late':
        return 'bg-amber-500';
      case 'WFH':
        return 'bg-blue-500';
      case 'Leave':
        return 'bg-purple-500';
      case 'Weekend':
        return 'bg-zinc-700';
      default:
        return 'bg-zinc-800';
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden max-w-lg lg:max-w-xl mx-auto">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-sm font-semibold text-zinc-100">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-zinc-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-4">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {daysInMonth.map((day) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const record = attendanceMap[dateStr];
          const status = record?.status;
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <div
              key={day}
              className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs relative transition-all border ${
                isToday ? 'ring-1 ring-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/30' : 'border-zinc-700/30'
              } ${status ? 'cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-600/50' : 'bg-zinc-800/20'}`}
            >
              <span className={`text-sm ${isToday ? 'font-semibold text-[#6366F1]' : 'text-zinc-400'}`}>
                {day}
              </span>
              {status && (
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-0.5 ${getStatusColor(status)}`}
                  title={status}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-400">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-zinc-400">Late</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-zinc-400">Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-zinc-600" />
          <span className="text-zinc-400">Weekend</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
