import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const AttendanceRequests = () => {
  const { user } = useAuth();
  const { regularizations, fetchRegularizations, applyRegularization } = useApp();
  const [formData, setFormData] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) fetchRegularizations(user.id);
  }, [user?.id, fetchRegularizations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await applyRegularization({
        userId: user.id,
        userName: user.name,
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        reason: formData.reason
      });
      setFormData({ date: '', checkIn: '', checkOut: '', reason: '' });
      await fetchRegularizations(user.id);
    } catch (err) {
      setError(err.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Regularization Form */}
      <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Request Regularization</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors dark-picker"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Check-in Time</label>
              <input
                type="time"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors dark-picker"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Check-out Time</label>
              <input
                type="time"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors dark-picker"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 transition-colors resize-none"
              rows={3}
              placeholder="Explain why you need regularization..."
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

      {/* Existing Requests */}
      <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Premium background accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="relative z-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">My Requests</h3>
        
        {regularizations.length === 0 ? (
          <p className="text-zinc-400 text-sm">No regularization requests yet.</p>
        ) : (
          <div className="space-y-3">
            {regularizations.map((req) => (
              <div
                key={req.id}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-zinc-200">{req.date}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStatusColor(req.status)}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <div className="text-sm text-zinc-400 mb-1">
                      <span className="text-zinc-500">Check-in:</span> {req.checkIn} •{' '}
                      <span className="text-zinc-500">Check-out:</span> {req.checkOut}
                    </div>
                    <p className="text-sm text-zinc-300">{req.reason}</p>
                  </div>
                  {req.approvedBy && (
                    <div className="text-xs text-zinc-500">
                      Approved by: {req.approvedBy}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRequests;
