import { useState } from 'react';
import AttendanceTabs from '../components/attendance/AttendanceTabs';
import AttendanceLog from '../components/attendance/AttendanceLog';
import AttendanceCalendar from '../components/attendance/AttendanceCalendar';
import AttendanceRequests from '../components/attendance/AttendanceRequests';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState('log');

  return (
    <div className="min-h-[calc(100vh-120px)] bg-zinc-950 px-4 sm:px-6 py-8 sm:py-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
       

        <AttendanceTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'log' && <AttendanceLog />}
          {activeTab === 'calendar' && <AttendanceCalendar />}
          {activeTab === 'requests' && <AttendanceRequests />}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
