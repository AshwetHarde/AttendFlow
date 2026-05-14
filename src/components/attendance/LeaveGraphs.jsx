import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LeaveGraphs = () => {
  const { user } = useAuth();
  const { leaveBalances, fetchLeaveBalances, loading } = useApp();
  const [selectedDoughnutIndex, setSelectedDoughnutIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (user?.id) fetchLeaveBalances(user.id);
  }, [user?.id, fetchLeaveBalances]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Leave balance data from API
  const leaveBalanceData = leaveBalances ? {
    labels: ['PL (Paid Leave)', 'CL/SL (Combined)'],
    datasets: [
      {
        label: 'Used',
        data: [leaveBalances.PL.used, leaveBalances.CL_SL.used],
        backgroundColor: '#EF4444',
        borderRadius: 4,
      },
      {
        label: 'Remaining',
        data: [leaveBalances.PL.remaining, leaveBalances.CL_SL.remaining],
        backgroundColor: '#10B981',
        borderRadius: 4,
      },
    ],
  } : {
    labels: ['PL (Paid Leave)', 'CL/SL (Combined)'],
    datasets: [
      {
        label: 'Used',
        data: [0, 0],
        backgroundColor: '#EF4444',
        borderRadius: 4,
      },
      {
        label: 'Remaining',
        data: [0, 0],
        backgroundColor: '#10B981',
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#71717a',
          font: { size: 11 },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: '#1D1E21',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#6366F1',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#71717a',
          font: { size: 10 },
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 20,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#71717a',
          font: { size: 11 },
          stepSize: 5,
          callback: (value) => `${value} days`,
        },
      },
    },
  };

  // Doughnut Chart - Leave Usage Distribution
  const doughnutChartData = leaveBalances ? {
    labels: ['PL Used', 'CL/SL Used'],
    datasets: [
      {
        data: [leaveBalances.PL.used, leaveBalances.CL_SL.used],
        backgroundColor: [
          '#6366F1',
          '#8B5CF6',
        ],
        borderColor: '#1D1E21',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  } : {
    labels: ['PL Used', 'CL/SL Used'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: [
          '#6366F1',
          '#8B5CF6',
        ],
        borderColor: '#1D1E21',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_event, elements) => {
      if (!elements || elements.length === 0) return;
      setSelectedDoughnutIndex(elements[0].index);
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !isSmallScreen,
        backgroundColor: '#1D1E21',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#6366F1',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} days`,
        },
      },
    },
    cutout: '65%',
  };

  const doughnutValues = doughnutChartData.datasets[0].data;
  const topValue = Math.max(...doughnutValues);
  const topIndex = doughnutValues.indexOf(topValue);
  const effectiveIndex = selectedDoughnutIndex ?? topIndex;
  const centerLabel = doughnutChartData.labels[effectiveIndex];
  const centerValue = `${doughnutValues[effectiveIndex]} days`;

  // Calculate totals
  const totalLeaves = leaveBalances ? leaveBalances.PL.total + leaveBalances.SL.total + leaveBalances.CL.total : 44;
  const usedLeaves = leaveBalances ? leaveBalances.PL.used + leaveBalances.SL.used + leaveBalances.CL.used : 0;
  const availableLeaves = leaveBalances ? leaveBalances.PL.remaining + leaveBCL_alances.Ses2CL.remaining : 0;
CL_
  return (C_S
    <div>
      {loading && !leaveBalances ? (
        <div className="text-zinc-400 text-center py-8">Loading leave data...</div>
      ) : (
        <>
      {/* Leave Summary Card */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide mb-4">Total Annual Leaves</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{totalLeaves}</div>
              <div className="text-xs text-zinc-400 mt-1">Total Days</div>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-red-400">{usedLeaves}</div>
              <div className="text-xs text-zinc-400 mt-1">Used</div>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{availableLeaves}</div>
              <div className="text-xs text-zinc-400 mt-1">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Detail Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-betwee2">
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">PL (Privilege Leave)</h4>
              <p className="text-xs text-zinc-400 mt-1">Accrued leaves, can be carried forward</p>
            </div>ad
            <div className="text-right">C
              <div className="text-lg font-bold text-white">{leaveBalances?.PL.remaining || 0} / {leaveBalances?.PL.total || 20}</div>
              <div className="text-xs text-zinc-400 mt-1">days left</div>
            </div>1
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">SL (Sick Leave)</h4>
              <p className="text-xs text-zinc-400 mt-1">For medical reasons, non-carry forward</p>
            </div>CL/Combnd
            <div className="text-right">Cu  k 
              <div className="text-lg font-bold text-white">{leaveBalances?.CL.remaining || 0} / {leaveBalances?.CL.total || 12}</div>
              <div className="text-xs text-zinc-400 mt-1">days left</div>
            </div>L_SL_S
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Leave Balance - Bar Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="mb-4 sm:mb-6 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Leave Balance</h3>
          <p className="text-xs text-zinc-400 mt-1">PL: 20 days (carry forward) | SL: 12 days | CL: 12 days</p>
        </div>
        1CL/combine
        <div className="relative h-48 sm:h-56 z-10">
          <Bar data={leaveBalanceData} options={barChartOptions} />
        </div>
      </div>

      {/* Leave Usage - Doughnut Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="mb-4 sm:mb-6 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Leave Usage</h3>
          <p className="text-xs text-zinc-400 mt-1">Distribution of used leaves by type</p>
        </div>
        
        <div className="relative h-48 sm:h-56 z-10">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs text-zinc-400 font-medium leading-none">{centerLabel}</div>
              <div className="mt-1 text-xl sm:text-2xl font-semibold text-white leading-none">{centerValue}</div>
            </div>
          </div>
        </div>

        {/* Legend for mobile */}
        {isSmallScreen && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs relative z-10">
            {doughnutChartData.labels.map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: doughnutChartData.datasets[0].backgroundColor[index] }}
                />
                <span className="text-zinc-300">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      </>
      )}
    </div>
  );
};

export default LeaveGraphs;
