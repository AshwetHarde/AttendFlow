import React from 'react';
import { HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';

const LeaveRequestsList = ({ leaves }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Pending':
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  const getLeaveTypeColor = (type) => {
    const t = type?.toLowerCase() || '';
    switch (t) {
      case 'sick':
        return 'bg-red-500/10 text-red-400';
      case 'casual':
        return 'bg-blue-500/10 text-blue-400';
      case 'earned':
      case 'earned leave':
      case 'pl':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'compensatory':
      case 'compensatory off':
      case 'compoff':
        return 'bg-purple-500/10 text-purple-400';
      default:
        return 'bg-zinc-500/10 text-zinc-400';
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '---';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">My Leave Requests</h3>
        
        {leaves.length === 0 ? (
          <p className="text-zinc-400 text-sm">No leave requests yet.</p>
        ) : (
          <div className="space-y-3">
            {leaves.map((leave) => {
              const leaveType = leave.type || leave.leaveType || 'leave';
              const duration = leave.days || calculateDays(leave.startDate, leave.endDate);
              
              return (
                <div
                  key={leave.id}
                  className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-sm font-medium text-zinc-200">
                          {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                        </span>
                        <span className="text-xs text-zinc-500">
                          ({duration} {duration === 1 ? 'day' : 'days'})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(leave.status)}`}
                        >
                          {leave.status}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${getLeaveTypeColor(leaveType)}`}>
                          {leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} Leave
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 mb-1">{leave.reason}</p>
                      <div className="text-xs text-zinc-500">
                        Applied on: {formatDate(leave.appliedOn)}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1">
                      {leave.status === 'Pending' && (
                        <HiOutlineClock className="w-4 h-4 text-amber-400" />
                      )}
                      {leave.status === 'Approved' && (
                        <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                      {leave.status === 'Rejected' && (
                        <HiOutlineXCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestsList;
