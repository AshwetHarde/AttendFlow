import React from 'react';

const HolidayStats = ({ totalHolidays, passedHolidays, upcomingHolidays }) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const passedPercentage = (passedHolidays / totalHolidays) * 100;
  const upcomingPercentage = (upcomingHolidays / totalHolidays) * 100;
  const passedOffset = circumference - (passedPercentage / 100) * circumference;
  const upcomingOffset = circumference - (upcomingPercentage / 100) * circumference;
  const upcomingRotation = (passedPercentage / 100) * 360;

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden w-full h-full lg:min-h-[360px] flex flex-col">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Holiday Statistics</h3>
        
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <svg width="250" height="250" viewBox="0 0 250 250" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="125"
                cy="125"
                r={radius}
                fill="none"
                stroke="#27272a"
                strokeWidth="20"
              />
              {/* Passed holidays arc */}
              <circle
                cx="125"
                cy="125"
                r={radius}
                fill="none"
                stroke="#e4e4e7"
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={passedOffset}
                strokeLinecap="round"
              />
              {/* Upcoming holidays arc */}
              <circle
                cx="125"
                cy="125"
                r={radius}
                fill="none"
                stroke="#6366F1"
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={upcomingOffset}
                strokeLinecap="round"
                transform={`rotate(${upcomingRotation}, 125, 125)`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-zinc-100">{totalHolidays}</div>
                <div className="text-xs text-zinc-400">Total</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#e4e4e7] flex-shrink-0"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-zinc-100">{passedHolidays}</span>
                <span className="text-xs text-zinc-500">Passed</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1] flex-shrink-0"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-zinc-100">{upcomingHolidays}</span>
                <span className="text-xs text-zinc-500">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayStats;
