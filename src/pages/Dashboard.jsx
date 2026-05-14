import { useEffect, useState } from 'react';
import { Clock, LogIn, LogOut, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import Loader from '../components/shared/Loader';
import AttendanceCards from '../components/dashboard/AttendanceCards';
import Trends from '../components/dashboard/Trends';
import AttendanceBreakdown from '../components/dashboard/AttendanceBreakdown';

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchDashboardStats, checkIn, checkOut, attendance, fetchAttendance, isCheckedIn, setIsCheckedIn } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const jsDay = new Date().getDay();
    return (jsDay + 6) % 7;
  });
  const [activeGraph, setActiveGraph] = useState('performance');
  const [checkInTime, setCheckInTime] = useState(() => {
    const saved = localStorage.getItem('checkInTime');
    if (!saved) return null;
    try {
      const date = new Date(JSON.parse(saved));
      return date instanceof Date && !isNaN(date) ? date : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user?.id) {
      fetchDashboardStats(user.id);
      fetchAttendance(user.id);
    }
  }, [user, fetchDashboardStats, fetchAttendance]);


  useEffect(() => {
    if (checkInTime && checkInTime instanceof Date && !isNaN(checkInTime)) {
      localStorage.setItem('checkInTime', JSON.stringify(checkInTime.toISOString()));
    }
  }, [checkInTime]);

  useEffect(() => {
    const jsDay = new Date().getDay();
    const todayIndex = (jsDay + 6) % 7;
    setSelectedDayIndex(todayIndex);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateWorkedTime = () => {
    if (!checkInTime || !isCheckedIn || !(checkInTime instanceof Date) || isNaN(checkInTime)) return { hours: 0, minutes: 0 };
    const diff = currentTime - checkInTime;
    if (isNaN(diff) || diff < 0) return { hours: 0, minutes: 0 };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  const handleCheckInOut = async () => {
    try {
      if (isCheckedIn) {
        await checkOut(user.id);
        setCheckInTime(null);
        setIsCheckedIn(false);
      } else {
        await checkIn(user.id);
        setCheckInTime(new Date());
        setIsCheckedIn(true);
      }
      await fetchAttendance(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  const clockButtonClassName =
    'mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm ' +
    (isCheckedIn
      ? 'bg-red-600 text-white hover:bg-red-700 '
      : 'bg-indigo-600 text-white hover:bg-indigo-700 ') +
    'disabled:opacity-50';

  const hours24 = currentTime.getHours();
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const timeOnly = `${String(hours12).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;
  const timeChars = Array.from(timeOnly);

  const startOfWeek = (() => {
    const d = new Date(currentTime);
    const day = d.getDay();
    const diff = (day + 6) % 7;
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - diff);
    return d;
  })();

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatTime12 = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '--';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const selectedDate = weekDates[selectedDayIndex] ?? new Date(currentTime);
  const today = new Date(currentTime);

  const selectedAttendance = Array.isArray(attendance)
    ? attendance.find((a) => {
        const d = new Date(a.date);
        return d instanceof Date && !isNaN(d) && isSameDay(d, selectedDate);
      })
    : undefined;

  const selectedCheckIn = selectedAttendance?.checkIn ? new Date(selectedAttendance.checkIn) : null;
  const selectedCheckOut = selectedAttendance?.checkOut ? new Date(selectedAttendance.checkOut) : null;

  const selectedEndTime = (() => {
    if (selectedCheckOut instanceof Date && !isNaN(selectedCheckOut)) return selectedCheckOut;
    if (isSameDay(selectedDate, today) && isCheckedIn && checkInTime instanceof Date && !isNaN(checkInTime)) return currentTime;
    return null;
  })();

  const selectedDurationMinutes = (() => {
    if (!(selectedCheckIn instanceof Date) || isNaN(selectedCheckIn)) return 0;
    if (!(selectedEndTime instanceof Date) || isNaN(selectedEndTime)) return 0;
    const diffMs = selectedEndTime - selectedCheckIn;
    if (isNaN(diffMs) || diffMs <= 0) return 0;
    return Math.floor(diffMs / (1000 * 60));
  })();

  const selectedDuration = {
    hours: Math.floor(selectedDurationMinutes / 60),
    minutes: selectedDurationMinutes % 60,
  };

  const targetMinutes = 9 * 60;
  const workPct = Math.min(100, Math.round((selectedDurationMinutes / targetMinutes) * 100));

  return (
    <div className="min-h-[calc(100vh-120px)] bg-zinc-950 px-4 sm:px-6 py-8 sm:py-4">
      <div className="max-w-6xl mx-auto">
        <AttendanceCards
          user={user}
          isCheckedIn={isCheckedIn}
          currentTime={currentTime}
          handleCheckInOut={handleCheckInOut}
          calculateWorkedTime={calculateWorkedTime}
          weekDays={weekDays}
          weekDates={weekDates}
          selectedDayIndex={selectedDayIndex}
          today={today}
          isSameDay={isSameDay}
        />
       
        <div className="mt-10">
          {/* Segmented toggle for small screens */}
          <div className="lg:hidden flex items-center justify-center mb-4">
            <div className="relative flex items-center bg-zinc-800/80 rounded-lg p-1">
              {/* Sliding background pill */}
              <div
                className="absolute top-1 bottom-1 w-[calc(50%-8px)] bg-white rounded-md transition-all duration-300 ease-out"
                style={{
                  left: activeGraph === 'trends' ? 'calc(50% + 4px)' : '4px',
                }}
              ></div>
              {/* Attendance button */}
              <button
                onClick={() => setActiveGraph(activeGraph === 'performance' ? 'trends' : 'performance')}
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeGraph === 'performance' ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Attendance
              </button>
              {/* Performance button */}
              <button
                onClick={() => setActiveGraph(activeGraph === 'trends' ? 'performance' : 'trends')}
                className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeGraph === 'trends' ? 'text-zinc-900' : 'text-zinc-400'
                }`}
              >
                Performance
              </button>
            </div>
          </div>

          {/* Grid layout - show both on large screens, one on small */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10">
            <div className={activeGraph === 'trends' ? 'block' : 'hidden lg:block'}>
              <Trends />
            </div>
            <div className={activeGraph === 'performance' ? 'block' : 'hidden lg:block'}>
              <AttendanceBreakdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
