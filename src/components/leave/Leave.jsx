import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import LeaveRequestForm from './LeaveRequestForm';
import LeaveRequestsList from './LeaveRequestsList';
import PublicHolidays from './PublicHolidays';
import HolidayStats from './HolidayStats';
import LeaveBalance from './LeaveBalance';

const Leave = () => {
  const { user } = useApp();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('apply'); // 'apply', 'balance', 'holidays'

  const tabs = [
    { id: 'apply', label: 'Apply' },
    { id: 'balance', label: 'Balance' },
    { id: 'holidays', label: 'Holiday' },
  ];

  // Calculate holiday stats
  const publicHolidays = [
    { date: '2026-01-01' },
    { date: '2026-01-26' },
    { date: '2026-03-14' },
    { date: '2026-04-03' },
    { date: '2026-08-15' },
    { date: '2026-09-10' },
    { date: '2026-10-02' },
    { date: '2026-10-20' },
    { date: '2026-11-04' },
    { date: '2026-12-25' },
  ];

  const today = new Date();
  const passedHolidays = publicHolidays.filter(h => new Date(h.date) < today).length;
  const upcomingHolidays = publicHolidays.filter(h => new Date(h.date) >= today).length;
  const totalHolidays = publicHolidays.length;

  useEffect(() => {
    fetchLeaves();
  }, [user?.id]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      // Mock data - will be replaced with API call
      const mockLeaves = [
        {
          id: 1,
          userId: user?.id,
          startDate: '2026-04-15',
          endDate: '2026-04-16',
          leaveType: 'sick',
          reason: 'Not feeling well',
          status: 'Approved',
          appliedOn: '2026-04-14',
        },
        {
          id: 2,
          userId: user?.id,
          startDate: '2026-05-10',
          endDate: '2026-05-10',
          leaveType: 'casual',
          reason: 'Personal work',
          status: 'Pending',
          appliedOn: '2026-04-20',
        },
      ];
      setLeaves(mockLeaves);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLeave = async (leaveRequest) => {
    try {
      // Add to local state (will be replaced with API call)
      setLeaves((prev) => [leaveRequest, ...prev]);
    } catch (error) {
      console.error('Error submitting leave:', error);
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 items-stretch">
      {/* Navigation tabs at the top - sliding pill style */}
      <div className="flex items-center justify-center lg:justify-start">
        <div className="relative flex items-center bg-zinc-800/80 rounded-lg p-1 w-full max-w-lg">
          {/* Sliding background pill */}
          <div
            className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-out"
            style={{
              left: `calc(${tabs.findIndex(t => t.id === activeTab)} * 33.333% + 4px)`,
              width: 'calc(33.333% - 8px)',
              backgroundColor: 'white',
            }}
          ></div>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeTab === t.id ? 'text-zinc-900' : 'text-zinc-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'apply' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 lg:col-span-2">
            <LeaveRequestForm onSubmit={handleSubmitLeave} />
            <LeaveRequestsList leaves={leaves} />
          </div>
        </div>
      ) : activeTab === 'balance' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="h-full">
                <HolidayStats 
                  totalHolidays={totalHolidays}
                  passedHolidays={passedHolidays}
                  upcomingHolidays={upcomingHolidays}
                />
              </div>
              <div className="h-full">
                <LeaveBalance />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="lg:col-span-2">
            <PublicHolidays />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
