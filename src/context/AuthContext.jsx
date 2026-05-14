import { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = mockApi.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await mockApi.login(email, password);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await mockApi.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isEmployee: user?.role === 'employee',
    isManager: user?.role === 'manager',
    isAdmin: user?.role === 'admin',
    canApprove: user?.role === 'manager' || user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
