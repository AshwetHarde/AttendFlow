import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, CheckCircle, UserCircle, X, TrendingUp, CreditCard, Grid, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { canApprove, user, logout } = useAuth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/leave', icon: FileText, label: 'Leave' },
    { to: '/performance', icon: TrendingUp, label: 'Performance' },
    { to: '/expenses', icon: CreditCard, label: 'Expenses & travel' },
    { to: '/apps', icon: Grid, label: 'Apps' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  if (canApprove) {
    navItems.splice(3, 0, { to: '/approvals', icon: CheckCircle, label: 'Approvals' });
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 md:left-0 md:right-auto z-50 w-64 h-screen transform transition-transform duration-300 overflow-hidden bg-[#1D1E21] ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <img src="/logo/logo.png" alt="AttendFlow" className="w-10 h-10 object-contain" />
            <span className="text-white font-bold text-lg tracking-tight">AttendFlow</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-zinc-200" />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex flex-col h-[calc(100vh-64px)]">
          <div className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'text-[#6366F1] bg-zinc-800'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </div>

         
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
