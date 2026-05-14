import React, { useEffect } from 'react';
import { 
  User, 
  Calendar, 
  MapPin, 
  Hash,
  Briefcase,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Profile = () => {
  const { user } = useAuth();
  const { leaveBalances, fetchLeaveBalances } = useApp();

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalances(user.id);
    }
  }, [user, fetchLeaveBalances]);

  // Handle leave balance data
  const userLeaveBalance = Array.isArray(leaveBalances) 
    ? leaveBalances.find(lb => lb.userId === user?.id) 
    : leaveBalances;

  const safeLeaveBalance = userLeaveBalance || {
    PL: { total: 12, remaining: 12 },
    CL_SL: { total: 12, remaining: 12 }
  };

  const leaves = [
    { label: 'Privilege Leaves', remaining: safeLeaveBalance.PL?.remaining ?? 12, total: safeLeaveBalance.PL?.total ?? 12, color: 'indigo' },
    { label: 'Sick / Casual', remaining: safeLeaveBalance.CL_SL?.remaining ?? 12, total: safeLeaveBalance.CL_SL?.total ?? 12, color: 'emerald' },
  ];

  const colorMap = {
    indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-500/10', text: 'text-indigo-400' },
    emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-500/10', text: 'text-emerald-400' },
  };

  const getInitials = (name) => {
    if (!name) return "UN";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const displayName = user?.name || "Username";
  const initials = getInitials(displayName);

  const details = [
    { label: "Employee ID", value: user?.empId || "---", icon: <Hash className="w-4 h-4" /> },
    { label: "Date of Joining", value: user?.joiningDate || "---", icon: <Calendar className="w-4 h-4" /> },
    { label: "Birth Date", value: user?.dob || "---", icon: <User className="w-4 h-4" /> },
    { label: "Location", value: user?.location || "---", icon: <MapPin className="w-4 h-4" /> },
    { label: "Work Mode", value: user?.workMode || "---", icon: <Home className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Minimal Profile Card */}
      <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] border border-zinc-700/30 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Premium background accents - EXACTLY matched to Dashboard */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
        
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          {/* Avatar / Initials */}
          <div className="relative group">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-zinc-700/30 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-800 flex items-center justify-center">
                {user?.image ? (
                  <img 
                    src={user.image} 
                    alt={displayName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-4xl font-bold text-indigo-400 tracking-tighter">
                    {initials}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold text-white tracking-tight">{displayName}</h1>
            <p className="text-indigo-400 font-medium flex items-center justify-center gap-2">
              <Briefcase className="w-4 h-4" />
              {user?.role || "Position"}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 w-full max-w-2xl text-left">
            {details.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 group/item">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-500 group-hover/item:text-indigo-400 group-hover/item:bg-indigo-500/5 transition-all">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold mb-0.5">{item.label}</p>
                  <p className="text-zinc-200 font-medium group-hover/item:text-white transition-colors">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Leave Balances - Simplified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leaves.map((item, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] border border-zinc-700/30 p-6 rounded-2xl flex items-center justify-between group hover:border-zinc-600 transition-all shadow-xl relative overflow-hidden">
            {/* Subtle matched accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#6366F1]/5 via-[#6366F1]/2 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/3 via-transparent to-transparent rounded-full blur-xl"></div>
            
            <div className="space-y-1 relative z-10">
              <p className="text-sm text-zinc-400 font-medium">{item.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white">{item.remaining}</span>
                <span className="text-xs text-zinc-500 font-medium">/ {item.total} available</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${colorMap[item.color].light} flex items-center justify-center text-2xl font-bold ${colorMap[item.color].text} group-hover:scale-110 transition-transform`}>
              <Calendar className="w-5 h-5 opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
