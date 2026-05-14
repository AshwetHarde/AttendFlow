import { useMemo } from 'react';
import { Calendar } from 'lucide-react';

const ContributionGraph = () => {
  const contributionData = useMemo(() => {
    const data = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    for (let week = 0; week < 52; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(oneYearAgo);
        date.setDate(date.getDate() + (week * 7) + day);

        const contributionCount = Math.floor(Math.random() * 11);

        let colorClass;
        if (contributionCount === 0) colorClass = 'bg-[#161b22]';
        else if (contributionCount <= 3) colorClass = 'bg-[#312e81]';
        else if (contributionCount <= 6) colorClass = 'bg-[#4f46e5]';
        else if (contributionCount <= 9) colorClass = 'bg-[#6366F1]';
        else colorClass = 'bg-[#818cf8]';

        weekData.push({
          date: date.toISOString().split('T')[0],
          contributionCount,
          colorClass,
        });
      }
      data.push(weekData);
    }
    return data;
  }, []);

  const months = useMemo(() => {
    const out = [];
    let current = '';
    contributionData.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0].date;
      const dateObj = new Date(firstDayOfWeek);
      const monthName = dateObj.toLocaleString('default', { month: 'short' });
      const year = dateObj.getFullYear();
      const monthYearKey = `${monthName}-${year}`;
      if (monthYearKey !== current) {
        current = monthYearKey;
        out.push({ name: monthName, weekIndex, year });
      }
    });
    return out;
  }, [contributionData]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-5 border border-zinc-700/30 shadow-2xl relative overflow-hidden font-sans [--week-width:14px] [--left-offset:44px] sm:[--week-width:17px] sm:[--left-offset:48px]">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#6366F1]" />
          <h3 className="text-sm font-semibold text-[#c9d1d9]">Contribution Activity</h3>
        </div>

        <div className="overflow-hidden">
          <div
            className="overflow-x-auto overflow-y-hidden scrollbar-hide lg:flex lg:justify-center"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="pb-2" style={{ minWidth: '760px' }}>
              <div className="flex mb-2 pl-11 sm:pl-12 relative" style={{ height: '14px' }}>
                {months.map((month, index) => (
                  <div
                    key={`${month.name}-${month.year}-${index}`}
                    className="text-[11px] text-[#8b949e] absolute"
                    style={{ 
                      left: `calc(var(--week-width) * ${month.weekIndex} + var(--left-offset))` 
                    }}
                  >
                    {month.name}
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2">
                {/* Week day labels */}
                <div className="flex flex-col text-[11px] sm:text-[12px] text-[#8b949e] w-9 sm:w-10 flex-shrink-0">
                  {weekDays.map((day, i) => (
                    <div key={day} className="h-[11px] sm:h-[13px] mb-[3px] sm:mb-[4px] flex items-center">
                      {(i === 1 || i === 3 || i === 5) ? day : ''}
                    </div>
                  ))}
                </div>

                {/* Contribution cells */}
                <div className="flex gap-[3px] sm:gap-[4px] flex-nowrap w-full">
                  {contributionData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px] sm:gap-[4px] flex-shrink-0">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[2px] transition-colors duration-300 flex-shrink-0 ${day.colorClass} border border-[rgba(27,31,35,0.06)]`}
                          title={`${day.date}: ${day.contributionCount} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info - Legend and link */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-[#8b949e]">
          <div className="hover:text-[#58a6ff] cursor-pointer transition-colors">
            Learn how we count contributions
          </div>
          
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-[3px]">
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#161b22] border border-[rgba(27,31,35,0.06)]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#312e81] border border-[rgba(27,31,35,0.06)]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#4f46e5] border border-[rgba(27,31,35,0.06)]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#6366F1] border border-[rgba(27,31,35,0.06)]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-[#818cf8] border border-[rgba(27,31,35,0.06)]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
