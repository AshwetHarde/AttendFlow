import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const AttendanceBreakdown = () => {
  const [selectedDoughnutIndex, setSelectedDoughnutIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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
    <div className="bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-3 sm:p-4 border border-zinc-700/30 shadow-2xl relative overflow-hidden">
      {/* Premium background accents */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/4 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="mb-2 sm:mb-3 relative z-10">
        <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-wide">Attendance Breakdown</h3>
      </div>
      
      <div className="relative h-40 sm:h-48 z-10">
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-xs text-zinc-400 font-medium leading-none">{centerLabel}</div>
            <div className="mt-1 text-xl sm:text-2xl font-semibold text-white leading-none">{centerValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBreakdown;
