import React from 'react';

const AttendanceTabs = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'log', label: 'Log' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'requests', label: 'Requests' },
  ];

  return (
    <div className="w-full">
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
              onClick={() => onChange(t.id)}
              className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeTab === t.id ? 'text-zinc-900' : 'text-zinc-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTabs;
