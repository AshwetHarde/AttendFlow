import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const LeaveBalance = () => {
  const { user } = useAuth();
  const { leaveBalances, fetchLeaveBalances } = useApp();

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalances(user.id);
    }
  }, [user, fetchLeaveBalances]);

  const userBalance = Array.isArray(leaveBalances) 
    ? leaveBalances.find(lb => lb.userId === user?.id) 
    : leaveBalances;

  const leaveTypes = [
    {
      name: 'PL (Paid Leave)',
      total: userBalance?.PL?.total || 12,
      remaining: userBalance?.PL?.remaining || 12,
      color: '#6366F1',
      description: 'Can be carried forward',
    },
    {
      name: 'CL/SL (Combined)',
      total: userBalance?.CL_SL?.total || 12,
      remaining: userBalance?.CL_SL?.remaining || 12,
      color: '#06b6d4',
      description: 'Casual or Sick Leave, non-carry forward',
    },
    {
      name: 'Compensatory Off',
      total: userBalance?.CompOff?.total || 2,
      remaining: userBalance?.CompOff?.remaining || 2,
      color: '#a855f7',
      description: 'For working on holidays, non-carry forward',
    },
  ];

  const totalAvailable = leaveTypes.reduce((acc, curr) => acc + curr.remaining, 0);
  const totalAllocated = leaveTypes.reduce((acc, curr) => acc + curr.total, 0);


  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden w-full h-full lg:min-h-[360px] flex flex-col">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Leave Balance</h3>
        
        <div className="space-y-3">
          {leaveTypes.map((leave) => {
            const percentage = (leave.remaining / leave.total) * 100;
            return (
              <div key={leave.name} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{leave.name}</div>
                    <div className="text-xs text-zinc-500">{leave.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-zinc-100">
                      {leave.remaining} / {leave.total}
                    </div>
                    <div className="text-xs text-zinc-500">days left</div>
                  </div>
                </div>
                {leave.showProgress && (
                  <div className="h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: leave.color
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-zinc-800/30 border border-zinc-700/30 rounded-lg">
          <div className="text-xs text-zinc-400">
            <span className="font-medium text-zinc-300">Total Annual Leaves:</span> {totalAllocated} days
            <span className="mx-2">•</span>
            <span className="font-medium text-zinc-300">Used:</span> {totalAllocated - totalAvailable} days
            <span className="mx-2">•</span>
            <span className="font-medium text-zinc-300">Available:</span> {totalAvailable} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;