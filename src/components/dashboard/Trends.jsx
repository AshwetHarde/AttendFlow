import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Trends = () => {
  const [activeTab, setActiveTab] = useState('Weekly');
  const tabs = ['Weekly', 'Monthly'];

  // Weekly Data - 5 working days (Mon-Fri)
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    data: [78, 85, 65, 92, 88],
  };

  // Monthly Data - Last 4 weeks with trends
  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [78, 62, 89, 71],
  };

  // Line Chart Data - Performance Trends
  const lineChartData = {
    labels: activeTab === 'Weekly' ? weeklyData.labels : monthlyData.labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: activeTab === 'Weekly' ? weeklyData.data : monthlyData.data,
        borderColor: '#6366F1',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.5,
        pointBackgroundColor: '#1D1E21',
        pointBorderColor: '#6366F1',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#6366F1',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1D1E21',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#6366F1',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#71717a',
          font: { size: 11 },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#71717a',
          font: { size: 11 },
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl relative overflow-hidden">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Performance </h3>
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 text-xs sm:text-sm transition-all duration-200 ${
                activeTab === tab ? 'text-[#6366F1]' : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full transition-all duration-200 ${activeTab === tab ? 'bg-[#6366F1] shadow-sm shadow-[#6366F1]/30' : 'bg-zinc-500'}`}></span>
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative h-40 sm:h-48 z-10">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Trends;
