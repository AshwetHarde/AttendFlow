import mockData from '../data/mockData.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const storage = {
  users: [...mockData.users],
  attendance: [...mockData.attendance],
  leaves: [...mockData.leaves],
  regularizations: [...mockData.regularizations],
  leaveBalances: [...mockData.leaveBalances],
  holidays: [...mockData.holidays],
  currentUser: null,
  isCheckedIn: false,
  checkInTime: null
};

export const mockApi = {
  // Auth
  login: async (email, password) => {
    await delay(500);
    const user = storage.users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    storage.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { user, token: 'mock-token-' + Date.now() };
  },

  logout: async () => {
    await delay(300);
    storage.currentUser = null;
    storage.isCheckedIn = false;
    storage.checkInTime = null;
    localStorage.removeItem('currentUser');
    return { success: true };
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  },

  // Attendance
  getAttendance: async (userId) => {
    await delay(400);
    return storage.attendance.filter(a => a.userId === userId).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getAllAttendance: async () => {
    await delay(400);
    return storage.attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  checkIn: async (userId) => {
    await delay(500);
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    const dateStr = now.toISOString().split('T')[0];
    
    const workStart = new Date(now);
    workStart.setHours(9, 30, 0);
    
    const lateBy = now > workStart ? Math.floor((now - workStart) / 60000) : 0;
    
    storage.isCheckedIn = true;
    storage.checkInTime = timeStr;
    
    const existing = storage.attendance.find(a => a.userId === userId && a.date === dateStr);
    if (!existing) {
      storage.attendance.unshift({
        id: Date.now(),
        userId,
        date: dateStr,
        status: lateBy > 0 ? 'Late' : 'Present',
        checkIn: timeStr,
        checkOut: null,
        workHours: '0h',
        lateBy: lateBy > 0 ? `${lateBy}m` : '0m'
      });
    }
    
    return { success: true, checkInTime: timeStr, lateBy };
  },

  checkOut: async (userId) => {
    await delay(500);
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    const dateStr = now.toISOString().split('T')[0];
    
    const record = storage.attendance.find(a => a.userId === userId && a.date === dateStr);
    if (record && record.checkIn) {
      const checkIn = new Date(`${dateStr}T${record.checkIn}`);
      const checkOut = new Date(`${dateStr}T${timeStr}`);
      const diffMs = checkOut - checkIn;
      const hours = Math.floor(diffMs / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      record.checkOut = timeStr;
      record.workHours = `${hours}h ${mins}m`;
    }
    
    storage.isCheckedIn = false;
    storage.checkInTime = null;
    
    return { success: true, checkOutTime: timeStr, workHours: record?.workHours || '0h' };
  },

  getCheckInStatus: () => {
    return { isCheckedIn: storage.isCheckedIn, checkInTime: storage.checkInTime };
  },

  // Leaves
  getLeaves: async (userId) => {
    await delay(400);
    return storage.leaves.filter(l => l.userId === userId).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  },

  getAllLeaves: async () => {
    await delay(400);
    return storage.leaves.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  },

  applyLeave: async (leaveData) => {
    await delay(600);
    const newLeave = {
      id: Date.now(),
      ...leaveData,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: null
    };
    storage.leaves.unshift(newLeave);
    return { success: true, leave: newLeave };
  },

  updateLeaveStatus: async (leaveId, status, approvedBy) => {
    await delay(400);
    const leave = storage.leaves.find(l => l.id === leaveId);
    if (leave) {
      leave.status = status;
      leave.approvedBy = approvedBy;
    }
    return { success: true, leave };
  },

  // Regularizations
  getRegularizations: async (userId) => {
    await delay(400);
    return storage.regularizations.filter(r => r.userId === userId).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  },

  getAllRegularizations: async () => {
    await delay(400);
    return storage.regularizations.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  },

  applyRegularization: async (regData) => {
    await delay(600);
    const newReg = {
      id: Date.now(),
      ...regData,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: null
    };
    storage.regularizations.unshift(newReg);
    return { success: true, regularization: newReg };
  },

  updateRegularizationStatus: async (regId, status, approvedBy) => {
    await delay(400);
    const reg = storage.regularizations.find(r => r.id === regId);
    if (reg) {
      reg.status = status;
      reg.approvedBy = approvedBy;
    }
    return { success: true, regularization: reg };
  },

  // Dashboard Stats
  getDashboardStats: async (userId) => {
    await delay(500);
    const userAttendance = storage.attendance.filter(a => a.userId === userId);
    const userLeaves = storage.leaves.filter(l => l.userId === userId);
    
    const presentDays = userAttendance.filter(a => ['Present', 'Late', 'WFH'].includes(a.status)).length;
    const totalLeaves = userLeaves.filter(l => l.status === 'Approved').reduce((acc, l) => acc + l.days, 0);
    const pendingRequests = [
      ...userLeaves.filter(l => l.status === 'Pending'),
      ...storage.regularizations.filter(r => r.userId === userId && r.status === 'Pending')
    ].length;
    
    const workingDays = userAttendance.filter(a => !['Weekend', 'Leave'].includes(a.status)).length;
    const attendancePercentage = workingDays > 0 ? Math.round((presentDays / workingDays) * 100) : 0;
    
    return {
      presentDays,
      totalLeaves,
      pendingRequests,
      attendancePercentage,
      isCheckedIn: storage.isCheckedIn
    };
  },

  // Leave Balances
  getLeaveBalances: async (userId) => {
    await delay(400);
    const balance = storage.leaveBalances.find(lb => lb.userId === userId);
    return balance || null;
  },

  // Holidays
  getHolidays: async () => {
    await delay(400);
    return storage.holidays.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
};
