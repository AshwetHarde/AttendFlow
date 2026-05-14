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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const HolidayGraphs = () => {
  const [selectedDoughnutIndex, setSelectedDoughnutIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Holiday distribution by month
  const monthlyHolidayData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Holidays',
        data: [2, 0, 1, 1, 0, 0, 0, 1, 0, 2, 0, 1],
        backgroundColor: '#6366F1',
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1D1E21',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#6366F1',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} holiday(s)`,
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
          font: { size: 10 },
        },
      },
      y: {
        min: 0,
        max: 4,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#71717a',
          font: { size: 11 },
          stepSize: 1,
          callback: (value) => `${value}`,
        },
      },
    },
  };

  // Doughnut Chart - Holiday Types
  const doughnutChartData = {
    labels: ['National Holiday', 'Festival', 'Religious Holiday'],
    datasets: [
      {
        data: [4, 2, 2],
        backgroundColor: [
          '#6366F1',
          '#F59E0B',
          '#10B981',
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
          label: (context) => `${context.label}: ${context.parsed}`,
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
  const centerValue = `${doughnutValues[effectiveIndex]}`;

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Monthly Holidays - Bar Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="mb-4 sm:mb-6 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Monthly Holidays</h3>
          <p className="text-xs text-zinc-400 mt-1">Holiday distribution throughout the year</p>
        </div>
        
        <div className="relative h-48 sm:h-56 z-10">
          <Bar data={monthlyHolidayData} options={barChartOptions} />
        </div>
      </div>

      {/* Holiday Types - Doughnut Chart */}
      <div className="bg-gradient-to-br from-[#1D1E21] to-[#25262A] rounded-2xl p-4 sm:p-6 border border-zinc-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#6366F1]/5 to-transparent rounded-full blur-2xl"></div>
        <div className="mb-4 sm:mb-6 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Holiday Types</h3>
          <p className="text-xs text-zinc-400 mt-1">Total: 8 holidays</p>
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
          <div className="mt-4 grid grid-cols-1 gap-2 text-xs relative z-10">
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
  );
};

export default HolidayGraphs;
