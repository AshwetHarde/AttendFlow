import React from 'react';

const publicHolidays2026 = [
  { date: '2026-01-01', name: 'New Year\'s Day', day: 'Thursday' },
  { date: '2026-01-26', name: 'Republic Day', day: 'Monday' },
  { date: '2026-03-14', name: 'Holi', day: 'Saturday' },
  { date: '2026-04-03', name: 'Good Friday', day: 'Friday' },
  { date: '2026-08-15', name: 'Independence Day', day: 'Saturday' },
  { date: '2026-09-10', name: 'Ganesh Chaturthi', day: 'Thursday' },
  { date: '2026-10-02', name: 'Gandhi Jayanti', day: 'Friday' },
  { date: '2026-10-20', name: 'Dussehra', day: 'Tuesday' },
  { date: '2026-11-04', name: 'Diwali', day: 'Wednesday' },
  { date: '2026-12-25', name: 'Christmas Day', day: 'Friday' },
];

const PublicHolidays = () => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { month: 'long' });
  };

  const groupedHolidays = publicHolidays2026.reduce((acc, holiday) => {
    const month = getMonthName(holiday.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(holiday);
    return acc;
  }, {});

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Public Holidays 2026 (India)</h3>
        
        <div className="space-y-4">
          {Object.entries(groupedHolidays).map(([month, holidays]) => (
            <div key={month}>
              <h4 className="text-sm font-semibold text-zinc-300 mb-2">{month}</h4>
              <div className="space-y-2">
                {holidays.map((holiday, idx) => (
                  <div
                    key={`${holiday.date}-${idx}`}
                    className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#6366F1]/10 text-[#6366F1] px-2 py-1 rounded text-xs font-semibold">
                        {formatDate(holiday.date)}
                      </div>
                      <span className="text-sm text-zinc-200">{holiday.name}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{holiday.day}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicHolidays;
