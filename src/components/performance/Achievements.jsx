import { Award, Calendar } from 'lucide-react';

const Achievements = ({ activeTab, progressData }) => {
  const currentData = progressData[activeTab];

  return (
    <div className="w-full bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-4 sm:p-5 border border-zinc-700/30 shadow-2xl relative overflow-hidden font-sans">
      {/* Premium background accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6366F1]/8 via-[#6366F1]/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-4 h-4 text-[#6366F1]" />
          <h3 className="text-sm font-semibold text-[#c9d1d9]">Recent Achievements</h3>
        </div>
        
        <div className="space-y-3">
          {currentData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-b border-[#30363d]/50 last:border-0">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: achievement.color, color: achievement.color }}
              ></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#c9d1d9]">{achievement.title}</div>
                <div className="text-xs text-[#8b949e] flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {achievement.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
