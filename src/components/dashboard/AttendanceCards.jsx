import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AttendanceCards = ({
  user,
  isCheckedIn,
  currentTime,
  handleCheckInOut,
  calculateWorkedTime,
  weekDays,
  weekDates,
  selectedDayIndex,
  today,
  isSameDay
}) => {
  const hours24 = currentTime.getHours();
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const timeOnly = `${String(hours12).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;
  const timeChars = Array.from(timeOnly);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10">
      {/* Clock Card - Left Side */}
      <div className="mt-4 sm:mt-0 bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="text-center md:text-left mb-4 sm:mb-3 relative z-10">
          <p className="text-sm text-zinc-300 font-medium mb-3 sm:mb-2 tracking-wide">Welcome back, {user?.name?.split(' ')[0] || 'User'}</p>
          <div className="inline-flex items-baseline gap-2 justify-center md:justify-start">
            <span className="font-technology text-white leading-none whitespace-nowrap text-[clamp(3rem,15vw,4.5rem)] inline-grid grid-flow-col auto-cols-[0.96ch]">
              {timeChars.map((ch, idx) => (
                <span key={idx} className="w-[0.96ch] text-center">
                  {ch}
                </span>
              ))}
            </span>
            <span className="font-semibold text-zinc-400 leading-none whitespace-nowrap text-[clamp(1rem,5vw,1.5rem)] inline-block w-[2ch]">
              {meridiem}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-3 relative z-10">
          {/* Mobile: Date and Total Hours only - clean layout */}
          <div className="sm:hidden">
            <p className="text-xs text-zinc-400 font-medium mb-0.5 uppercase tracking-wider">Date</p>
            <p className="text-sm font-semibold text-zinc-100 leading-tight">
              {currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
            </p>
          </div>
          <div className="text-right sm:hidden">
            <p className="text-xs text-zinc-400 font-medium mb-0.5 uppercase tracking-wider">Total Hours</p>
            <p className="text-sm font-semibold text-zinc-100 leading-tight">
              {calculateWorkedTime().hours}h : {calculateWorkedTime().minutes}m
            </p>
          </div>
          
          {/* Desktop: Original 2x2 grid layout */}
          <div className="hidden sm:block">
            <p className="text-sm text-zinc-400 font-medium mb-1 uppercase tracking-wider">Date</p>
            <p className="text-base font-semibold text-zinc-100 leading-tight">
              {currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm text-zinc-400 font-medium mb-1 uppercase tracking-wider">Status</p>
            <p className={`text-base font-semibold leading-tight ${isCheckedIn ? 'text-green-400' : 'text-white'}`}>
              {isCheckedIn ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-zinc-400 font-medium mb-1 uppercase tracking-wider">Total Hours</p>
            <p className="text-base font-semibold text-zinc-100 leading-tight">
              {calculateWorkedTime().hours}h {calculateWorkedTime().minutes}m
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm text-zinc-400 font-medium mb-1 uppercase tracking-wider">Since Last Login</p>
            <p className="text-base font-semibold text-zinc-100 leading-tight">
              Today
            </p>
          </div>
        </div>

        <button
          onClick={handleCheckInOut}
          className={`w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
            isCheckedIn
              ? 'border-2 border-red-400 text-red-400 bg-red-400/10'
              : 'border-2 border-[#6366F1] text-[#6366F1] bg-[#6366F1]/10'
          }`}
        >
          {isCheckedIn ? (
            <><RiLogoutCircleRLine className="w-5 h-5" /> Web Clock-out</>
          ) : (
            <><RiLoginCircleLine className="w-5 h-5" /> Web Clock-in</>
          )}
        </button>
      </div>

      {/* Right Side - Time Graph Card */}
      <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/4 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 sm:justify-start sm:gap-2 mb-3 relative z-10">
              {weekDays.map((label, idx) => {
                const active = idx === selectedDayIndex;
                const isToday = isSameDay(weekDates[idx], today);
                return (
                  <div
                    key={`${label}-${idx}`}
                    className={
                      'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border text-[10px] sm:text-xs lg:text-sm font-semibold flex items-center justify-center transition-all duration-200 ' +
                      (active
                        ? 'bg-gradient-to-br from-[#6366F1]/20 to-[#6366F1]/10 border-[#6366F1]/60 text-[#6366F1] shadow-md shadow-[#6366F1]/20'
                        : 'bg-transparent border-zinc-600/50 text-zinc-300 hover:border-zinc-500') +
                      (isToday && !active ? ' ring-2 ring-[#6366F1]/20' : '')
                    }
                  >
                    {label}
                  </div>
                );
              })}
        </div>

        <div className="mt-auto space-y-3 relative z-10">
          <div className="text-sm text-zinc-100 font-medium tracking-wide">
            9:30 AM - 6:30 PM
          </div>

          {/* Timeline Graph */}
          <div className="relative">
            <div className="w-full bg-gradient-to-r from-zinc-800/60 to-zinc-700/60 rounded-2xl h-3 sm:h-5 overflow-hidden shadow-inner border border-zinc-700/30">
              {/* Work time segments */}
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#6366F1] to-[#6366F1]/90 rounded-l-2xl shadow-sm" style={{ width: '33.33%' }}></div>
              <div className="absolute left-[33.33%] top-0 h-full bg-gradient-to-r from-zinc-600 to-zinc-600/90" style={{ width: '11.11%' }}></div>
              <div className="absolute left-[44.44%] top-0 h-full bg-gradient-to-r from-[#6366F1]/90 to-[#6366F1] rounded-r-2xl shadow-sm" style={{ width: '55.56%' }}></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300 font-medium tracking-wide">Duration: 9h : 0m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCards;
