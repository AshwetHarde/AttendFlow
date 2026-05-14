import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const LeaveRequestForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const { leaveBalances, fetchLeaveBalances } = useApp();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'sick',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchLeaveBalances(user.id);
    }
  }, [user, fetchLeaveBalances]);

  const leaveTypes = [
    { id: 'sick', label: 'Sick Leave', key: 'CL_SL' },
    { id: 'casual', label: 'Casual Leave', key: 'CL_SL' },
    { id: 'earned', label: 'Earned Leave', key: 'PL' },
    { id: 'compensatory', label: 'Compensatory Off', key: 'CompOff' },
  ];

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const requestedDays = calculateDays(formData.startDate, formData.endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.startDate || !formData.endDate) {
      setError('Please select start and end dates');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      setError('End date must be after or same as start date');
      return;
    }

    // Balance check
    const typeInfo = leaveTypes.find(t => t.id === formData.leaveType);
    const userBalance = Array.isArray(leaveBalances) 
      ? leaveBalances.find(lb => lb.userId === user?.id) 
      : leaveBalances;
    
    const balance = userBalance?.[typeInfo.key]?.remaining || 0;

    if (requestedDays > balance) {
      setError(`Insufficient balance. You only have ${balance} days left for this leave type.`);
      return;
    }

    if (!formData.reason.trim()) {
      setError('Please provide a reason');
      return;
    }

    setLoading(true);
    try {
      const leaveRequest = {
        id: Date.now(),
        userId: user?.id,
        userName: user?.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        type: typeInfo.id,
        days: requestedDays,
        reason: formData.reason,
        status: 'Pending',
        appliedOn: new Date().toISOString().split('T')[0],
      };

      await onSubmit(leaveRequest);
      
      setFormData({
        startDate: '',
        endDate: '',
        leaveType: 'sick',
        reason: '',
      });
    } catch (err) {
      setError('Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Apply for Leave</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Start Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors dark-picker"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">End Date</label>
              <input
                type="date"
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors dark-picker"
                required
              />
            </div>
          </div>
          
          {requestedDays > 0 && (
            <div className="text-xs font-medium text-indigo-400">
              Total Duration: {requestedDays} {requestedDays === 1 ? 'day' : 'days'}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Leave Type</label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors"
              required
            >
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors resize-none"
              rows={3}
              placeholder="Explain why you need leave..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
