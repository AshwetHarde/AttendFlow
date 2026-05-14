import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import Header from './components/shared/Header'
import Sidebar from './components/shared/Sidebar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AttendancePage from './pages/AttendancePage'
import LeavePage from './pages/LeavePage'
import PerformancePage from './pages/PerformancePage'
import ApprovalPage from './pages/ApprovalPage'
import ProfilePage from './pages/ProfilePage'
import ExpensesPage from './pages/ExpensesPage'
import Applications from './pages/Applications'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-200">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden min-w-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 bg-zinc-950 overflow-x-hidden min-w-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/apps" element={<Applications />} />
            <Route path="/approvals" element={<ApprovalPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
