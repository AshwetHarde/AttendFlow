import UserProgress from '../components/performance/UserProgress';
import ContributionGraph from '../components/performance/ContributionGraph';
import Achievements from '../components/performance/Achievements';
import { useState } from 'react';

const PerformancePage = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  const progressData = {
    monthly: {
      goals: [
        { label: 'Attendance Goal', current: 92, target: 95, icon: 'Target' },
        { label: 'Tasks Completed', current: 45, target: 50, icon: 'Award' },
        { label: 'Performance Rating', current: 4.2, target: 5, icon: 'TrendingUp' },
      ],
      achievements: [
        { title: 'Perfect Week', date: 'Week 3', color: '#6366F1' },
        { title: 'Early Bird', date: 'Week 2', color: '#818cf8' },
        { title: 'Consistent', date: 'Week 1', color: '#4f46e5' },
      ],
    },
    quarterly: {
      goals: [
        { label: 'Attendance Goal', current: 88, target: 90, icon: 'Target' },
        { label: 'Tasks Completed', current: 130, target: 150, icon: 'Award' },
        { label: 'Performance Rating', current: 4.0, target: 5, icon: 'TrendingUp' },
      ],
      achievements: [
        { title: 'Top Performer', date: 'Q1', color: '#6366F1' },
        { title: 'Team Player', date: 'Q1', color: '#818cf8' },
      ],
    },
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-zinc-950 px-4 sm:px-6 py-8 sm:py-4 overflow-x-hidden w-full min-w-0">
      <div className="max-w-6xl mx-auto w-full min-w-0 space-y-6">
        {/* Top Section - Full Width Contribution Graph */}
        <div className="w-full">
          <ContributionGraph />
        </div>

        {/* Bottom Section - Two Columns for Progress and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserProgress activeTab={activeTab} setActiveTab={setActiveTab} progressData={progressData} />
          <Achievements activeTab={activeTab} progressData={progressData} />
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
