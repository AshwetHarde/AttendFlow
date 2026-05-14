import { useEffect, useMemo, useState } from 'react';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle } from 'react-icons/hi2';
import { GiTortoise } from 'react-icons/gi';
import {
  Circle,
  MapPin,
  MoreHorizontal,
  Timer,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
};

const AttendanceLog = () => {
  const { user } = useAuth();
  const { attendance, fetchAttendance, loading, isCheckedIn } = useApp();
  const months = useMemo(() => {
    const result = [];
    const d = new Date();
    for (let i = 0; i < 6; i++) {
      result.push(d.toLocaleDateString('en-US', { month: 'short' }));
      d.setMonth(d.getMonth() - 1);
    }
    return result;
  }, []);

  const [range, setRange] = useState(months[0]); // Default to current month (e.g., May)
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const rows = useMemo(() => {
    const list = Array.isArray(attendance) ? attendance : [];
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = list.find(r => r.date === today);

    let processedList = list.filter(r => r.date !== today || r.checkIn);

    // Filter by selected month
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const targetMonth = monthMap[range];
    const currentYear = new Date().getFullYear();
    
    // Adjust year if target month is in the future (meaning it's from last year)
    const targetYear = targetMonth > new Date().getMonth() ? currentYear - 1 : currentYear;

    processedList = processedList.filter(r => {
      const date = new Date(r.date);
      return date.getMonth() === targetMonth && date.getFullYear() === targetYear;
    });

    if (isCheckedIn && todayRecord && todayRecord.checkIn) {
      const checkInDate = new Date(`${today}T${todayRecord.checkIn}`);
      const diffMs = currentTime - checkInDate;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const liveWorkHours = `${hours}h ${minutes}m`;

      processedList = processedList.map(r => {
        if (r.date === today) {
          return { ...r, workHours: liveWorkHours };
        }
        return r;
      });
    }

    return processedList;
  }, [attendance, isCheckedIn, currentTime, range]);

  useEffect(() => {
    if (user?.id) fetchAttendance(user.id);
  }, [user?.id, fetchAttendance]);

  const getRowMeta = (r) => {
    const status = r?.status;
    const isWeeklyOff = status === 'Weekend';
    const isLeave = status === 'Leave';
    const isHalfDay = status === 'Half Day';
    const isPenalty = status === 'Penalty';
    const isLate = status === 'Late';
    const isWorkDay = status === 'Present' || isLate || isPenalty || isHalfDay;

    let arrivalText = '';
    if (isWorkDay && isLate) {
      const lateMinutes = parseInt(r?.lateBy?.replace('m', '') || '0');
      const lateHours = Math.floor(lateMinutes / 60);
      const lateMins = lateMinutes % 60;
      if (lateHours > 0) {
        arrivalText = `${lateHours}h ${lateMins}m late`;
      } else {
        arrivalText = `${lateMins}m late`;
      }
    } else if (isWorkDay) {
      arrivalText = 'On Time';
    }

    // Calculate progress bar width based on work hours (9h = 100%)
    const workHoursStr = r?.workHours || '0h 0m';
    const hoursMatch = workHoursStr.match(/(\d+)h (\d+)m/);
    let progressWidth = 0;
    if (hoursMatch) {
      const hours = parseInt(hoursMatch[1]);
      const minutes = parseInt(hoursMatch[2]);
      const totalMinutes = hours * 60 + minutes;
      const targetMinutes = 9 * 60;
      progressWidth = Math.min(100, Math.round((totalMinutes / targetMinutes) * 100));
    }

    return {
      status,
      isWeeklyOff,
      isLeave,
      isPenalty,
      isLate,
      isWorkDay,
      arrivalText,
      progressWidth,
    };
  };

  const formatHours = (h) => {
    if (!h) return '0h 0m';
    if (h.includes('m')) return h;
    return h.replace(/(\d+)h$/, '$1h 0m');
  };

  return (
    <div className="bg-zinc-950">
      <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-2 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="px-1 sm:px-6 py-2 sm:py-4 border-b border-zinc-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <div className="text-sm text-zinc-300 font-medium">{range.toUpperCase()} Attendance Log</div>
          </div>

          <div className="flex flex-wrap items-center bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden">
            {months.map((m, idx) => (
              <button
                key={m}
                type="button"
                onClick={() => setRange(m)}
                className={
                  `px-3 sm:px-4 py-2 text-xs font-semibold transition-colors ${idx !== 0 ? 'border-l border-zinc-800/70' : ''} ` +
                  (range === m
                    ? 'bg-[#4F46E5] text-white'
                    : 'text-zinc-300 hover:bg-zinc-800/50')
                }
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-full overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-zinc-400 bg-zinc-900/30">
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Date</th>
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Attendance Visual</th>
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Effective Hours</th>
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Gross Hours</th>
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Arrival</th>
                <th className="text-left px-4 sm:px-6 py-3 font-semibold">Log</th>
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 ? (
                <tr>
                  <td className="px-4 sm:px-6 py-6 text-zinc-400" colSpan={6}>
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-4 sm:px-6 py-6 text-zinc-400" colSpan={6}>
                    No attendance records.
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const meta = getRowMeta(r);
                  const isMutedRow = meta.isWeeklyOff || meta.isLeave;
                  const isHalfDayRow = meta.isHalfDay;
                  const effectiveHours = r.checkIn ? formatHours(r.workHours) : '0h 0m';
                  
                  // Check if work hours are less than 5 hours for half day detection
                  const workHoursMatch = r?.workHours?.match(/(\d+)h/);
                  const workHoursNum = workHoursMatch ? parseInt(workHoursMatch[1]) : 0;
                  const isAutoHalfDay = workHoursNum > 0 && workHoursNum < 5;

                  if (isMutedRow) {
                    return (
                      <tr key={r.id} className="border-t border-zinc-800/60 bg-zinc-900/20">
                        <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200 whitespace-nowrap">
                          {formatDate(r.date)}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-xs text-zinc-400" colSpan={2}>
                          {meta.isWeeklyOff ? 'Full day Weekly-off' : 'Sick / Casual Leave'}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                            meta.isWeeklyOff ? 'bg-zinc-600 text-zinc-200' : 'bg-purple-500 text-white'
                          }`}>
                            {meta.isWeeklyOff ? 'W-OFF' : 'LEAVE'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-xs text-zinc-400" colSpan={3}>
                        </td>
                      </tr>
                    );
                  }

                  if (isHalfDayRow) {
                    return (
                      <tr key={r.id} className="border-t border-zinc-800/60 bg-[#4F46E5]/10">
                        <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200 whitespace-nowrap">
                          {formatDate(r.date)}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-full max-w-[260px]">
                              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                                <div
                                  className="h-full bg-[#4F46E5] rounded-full"
                                  style={{ width: `${meta.progressWidth}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-zinc-400 mt-1 block">{formatHours(r.workHours)}</span>
                            </div>
                            <MapPin className="w-4 h-4 text-zinc-500" />
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#4F46E5] text-white">HD</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#4F46E5] text-white">1/2 DAY</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400">On Time</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <HiOutlineCheckCircle className="w-4 h-4 text-amber-400" />
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={r.id}
                      className={
                        'border-t border-zinc-800/60 ' +
                        (meta.isPenalty ? 'bg-[#6366F1]/10' : 'bg-transparent')
                      }
                    >
                      <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200 whitespace-nowrap">
                        {formatDate(r.date)}
                      </td>

                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          {r.checkIn ? (
                            <div className="w-full max-w-[260px]">
                              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                                <div
                                  className="h-full bg-[#6366F1] rounded-full"
                                  style={{ width: `${Math.min(100, meta.progressWidth)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-zinc-400 mt-1 block">{formatHours(r.workHours)}</span>
                            </div>
                          ) : (
                            <span className="text-zinc-400">0h 0m</span>
                          )}
                          <MapPin className="w-4 h-4 text-zinc-500" />
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            meta.isLate ? 'bg-[#4F46E5]' : 
                            meta.isWeeklyOff ? 'bg-zinc-600' : 
                            meta.isLeave ? 'bg-purple-500' : 
                            'bg-emerald-500'
                          }`} />
                          <span>{effectiveHours}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-zinc-200">
                        {isAutoHalfDay ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#4F46E5] text-white">1/2 DAY</span>
                        ) : (
                          r.checkIn ? formatHours(r.workHours) : '0h 0m'
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          {meta.isLate ? (
                            <>
                              <GiTortoise className="w-4 h-4 text-amber-400" />
                              <span className="text-amber-400">{meta.arrivalText || 'Late'}</span>
                            </>
                          ) : (
                            <span className="text-zinc-200">On Time</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-center">
                        {meta.isLate ? (
                          <HiOutlineExclamationCircle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden px-1 pb-1 space-y-1.5 relative z-10">
          {loading && rows.length === 0 ? (
            <div className="text-zinc-400 text-sm py-3">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="text-zinc-400 text-sm py-3">No attendance records.</div>
          ) : (
            rows.map((r) => {
              const meta = getRowMeta(r);
              const isMutedRow = meta.isWeeklyOff || meta.isLeave;
              const effectiveHours = r.checkIn ? formatHours(r.workHours) : '0h 0m';
              const workHoursMatch = r?.workHours?.match(/(\d+)h/);
              const workHoursNum = workHoursMatch ? parseInt(workHoursMatch[1]) : 0;
              const isAutoHalfDay = workHoursNum > 0 && workHoursNum < 5;

              const dotColor = meta.isLate
                ? 'bg-[#4F46E5]'
                : meta.isWeeklyOff
                ? 'bg-zinc-600'
                : meta.isLeave
                ? 'bg-purple-500'
                : 'bg-emerald-500';

              return (
                <div key={r.id} className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-zinc-100">{formatDate(r.date)}</div>
                    <div className="text-xs text-zinc-400">
                      {meta.isLate ? (
                        <HiOutlineExclamationCircle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {isMutedRow ? (
                    <div className="mt-1 text-xs text-zinc-400">
                      {meta.isWeeklyOff ? 'Full day Weekly-off' : 'Sick / Casual Leave'}
                    </div>
                  ) : (
                    <div className="mt-1.5">
                      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={`h-full ${meta.isHalfDay ? 'bg-[#4F46E5]' : 'bg-[#6366F1]'} rounded-full`}
                          style={{ width: `${Math.min(100, meta.progressWidth)}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{formatHours(r.workHours)}</span>
                        <span className="text-zinc-500">{meta.isLate ? meta.arrivalText : 'On Time'}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                    <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg p-1">
                      <div className="text-[10px] text-zinc-500 font-semibold uppercase">Effective</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                        <div className="text-sm text-zinc-100">{effectiveHours}</div>
                      </div>
                    </div>
                    <div className="bg-zinc-950/40 border border-zinc-800/60 rounded-lg p-1">
                      <div className="text-[10px] text-zinc-500 font-semibold uppercase">Gross</div>
                      <div className="mt-1 text-sm text-zinc-100">
                        {isMutedRow ? (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                            meta.isWeeklyOff ? 'bg-zinc-600 text-zinc-200' : 'bg-purple-500 text-white'
                          }`}>
                            {meta.isWeeklyOff ? 'W-OFF' : 'LEAVE'}
                          </span>
                        ) : isAutoHalfDay ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#4F46E5] text-white">1/2 DAY</span>
                        ) : (
                          r.checkIn ? formatHours(r.workHours) : '0h 0m'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceLog;
