import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const UserProgress = ({ activeTab, setActiveTab, progressData }) => {
  const currentData = progressData[activeTab];

  const data = {
    labels: currentData.goals.map(goal => goal.label),
    datasets: [
      {
        label: 'Performance',
        data: currentData.goals.map(goal => {
          return typeof goal.current === 'number' && goal.target > 0 
            ? Math.min(100, Math.round((goal.current / goal.target) * 100))
            : goal.current * 20;
        }),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366F1',
        borderWidth: 2,
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366F1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#c9d1d9',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.r}%`,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#30363d',
        },
        grid: {
          color: '#30363d',
        },
        pointLabels: {
          color: '#c9d1d9',
          font: {
            size: 11,
            weight: '500',
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-5 border border-zinc-700/30 shadow-2xl relative overflow-hidden font-sans h-full flex flex-col min-w-0">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-[#c9d1d9] whitespace-nowrap">Performance Metrics</h3>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {['monthly', 'quarterly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs transition-all duration-200 py-1 px-2 rounded-md ${
                  activeTab === tab 
                    ? 'text-[#6366F1] bg-[#6366F1]/10' 
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${activeTab === tab ? 'bg-[#6366F1]' : 'bg-[#30363d]'}`}></span>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-[220px] sm:min-h-[250px] relative w-full overflow-hidden">
          <Radar data={data} options={options} />
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 pt-4 border-t border-[#30363d]">
          {currentData.goals.map((goal, index) => (
            <div key={index} className="text-center min-w-0">
              <div className="text-[9px] sm:text-[10px] text-[#8b949e] uppercase tracking-wider mb-0.5 truncate px-1" title={goal.label}>
                {goal.label.split(' ')[0]}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-[#6366F1]">
                {typeof goal.current === 'number' && goal.target > 0 
                  ? Math.round((goal.current / goal.target) * 100)
                  : goal.current * 20}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProgress;
