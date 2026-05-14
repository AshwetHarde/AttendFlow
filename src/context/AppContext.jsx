import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockApi } from '../services/mockApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [regularizations, setRegularizations] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(() => {
    const saved = localStorage.getItem('isCheckedIn');
    return saved ? JSON.parse(saved) : false;
  });

  // Sync isCheckedIn with mockApi storage on mount
  useEffect(() => {
    const status = mockApi.getCheckInStatus();
    setIsCheckedIn(status.isCheckedIn);
  }, []);

  const fetchAttendance = useCallback(async (userId) => {
    setLoading(true);
    try {
      const data = await mockApi.getAttendance(userId);
      setAttendance(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAllAttendance();
      setAttendance(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeaves = useCallback(async (userId) => {
    setLoading(true);
    try {
      const data = await mockApi.getLeaves(userId);
      setLeaves(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllLeaves = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAllLeaves();
      setLeaves(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRegularizations = useCallback(async (userId) => {
    setLoading(true);
    try {
      const data = await mockApi.getRegularizations(userId);
      setRegularizations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllRegularizations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockApi.getAllRegularizations();
      setRegularizations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboardStats = useCallback(async (userId) => {
    setLoading(true);
    try {
      const data = await mockApi.getDashboardStats(userId);
      setDashboardStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeaveBalances = useCallback(async (userId) => {
    setLoading(true);
    try {
      const data = await mockApi.getLeaveBalances(userId);
      setLeaveBalances(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHolidays = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mockApi.getHolidays();
      setHolidays(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);


  const checkIn = useCallback(async (userId) => {
    const result = await mockApi.checkIn(userId);
    setIsCheckedIn(true);
    localStorage.setItem('isCheckedIn', 'true');
    await fetchAttendance(userId);
    await fetchDashboardStats(userId);
    return result;
  }, [fetchAttendance, fetchDashboardStats]);

  const checkOut = useCallback(async (userId) => {
    const result = await mockApi.checkOut(userId);
    setIsCheckedIn(false);
    localStorage.setItem('isCheckedIn', 'false');
    await fetchAttendance(userId);
    await fetchDashboardStats(userId);
    return result;
  }, [fetchAttendance, fetchDashboardStats]);

  const applyLeave = useCallback(async (leaveData) => {
    const result = await mockApi.applyLeave(leaveData);
    await fetchLeaves(leaveData.userId);
    await fetchDashboardStats(leaveData.userId);
    return result;
  }, [fetchLeaves, fetchDashboardStats]);

  const updateLeaveStatus = useCallback(async (leaveId, status, approvedBy) => {
    await mockApi.updateLeaveStatus(leaveId, status, approvedBy);
    await fetchAllLeaves();
  }, [fetchAllLeaves]);

  const applyRegularization = useCallback(async (regData) => {
    const result = await mockApi.applyRegularization(regData);
    await fetchRegularizations(regData.userId);
    await fetchDashboardStats(regData.userId);
    return result;
  }, [fetchRegularizations, fetchDashboardStats]);

  const updateRegularizationStatus = useCallback(async (regId, status, approvedBy) => {
    await mockApi.updateRegularizationStatus(regId, status, approvedBy);
    await fetchAllRegularizations();
  }, [fetchAllRegularizations]);

  const value = {
    attendance,
    leaves,
    regularizations,
    leaveBalances,
    holidays,
    dashboardStats,
    loading,
    error,
    isCheckedIn,
    setIsCheckedIn,
    fetchAttendance,
    fetchAllAttendance,
    fetchLeaves,
    fetchAllLeaves,
    fetchRegularizations,
    fetchAllRegularizations,
    fetchDashboardStats,
    fetchLeaveBalances,
    fetchHolidays,
    checkIn,
    checkOut,
    applyLeave,
    updateLeaveStatus,
    applyRegularization,
    updateRegularizationStatus
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
