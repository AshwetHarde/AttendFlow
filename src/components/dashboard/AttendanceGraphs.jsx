import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AttendanceGraphs = () => {
  const [activeTab, setActiveTab] = useState('Weekly');
  const [selectedDoughnutIndex, setSelectedDoughnutIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const tabs = ['Weekly', 'Monthly'];

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

  // Doughnut Chart Data - Attendance Breakdown
  const doughnutChartData = {
    labels: ['On Time', 'Late Arrival', 'Early Leave', 'Overtime'],
    datasets: [
      {
        data: [68, 15, 8, 6],
        backgroundColor: [
          '#6366F1',
          '#818CF8',
          '#A5B4FC',
          '#4F46E5',
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
          label: (context) => `${context.label}: ${context.parsed}%`,
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
  const centerValue = `${doughnutValues[effectiveIndex]}%`;

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Performance Trends - Line Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
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
        
        <div className="relative h-48 sm:h-56 z-10">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Attendance Breakdown - Doughnut Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="mb-4 sm:mb-6 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Attendance Breakdown</h3>
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
      </div>
    </div>
  );
};

export default AttendanceGraphs;
