import { useState } from 'react';
import { Menu, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isCheckedIn } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name) => {
    if (!name) return "UN";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const displayName = user?.name || "Username";
  const initials = getInitials(displayName);

  return (
    <header className="bg-zinc-900 md:bg-gradient-to-r md:from-zinc-950 md:to-zinc-900 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="md:hidden flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-10 h-10 rounded-full overflow-hidden hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center justify-center bg-zinc-800 ${
                isCheckedIn ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-zinc-900' : 'ring-2 ring-zinc-500 ring-offset-2 ring-offset-zinc-900'
              }`}
            >
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-indigo-400">{initials}</span>
              )}
            </button>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute left-0 top-full mt-2 w-48 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-zinc-800">
                    <p className="font-semibold text-zinc-100">{displayName}</p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 rounded-b-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{displayName}</p>
            <p className="text-xs text-zinc-400 capitalize">{user?.role || 'Unknown'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 pl-4 border-l border-zinc-800 hidden md:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-zinc-100">{displayName}</p>
            <p className="text-xs text-zinc-400 capitalize">{user?.role || 'Unknown'}</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center justify-center bg-zinc-800"
            >
              {user?.image ? (
                <img 
                  src={user.image} 
                  alt={displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-indigo-400">{initials}</span>
              )}
            </button>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-zinc-800">
                    <p className="font-semibold text-zinc-100">{displayName}</p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 rounded-b-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>


        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-zinc-800 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5 text-zinc-200" />
        </button>
      </div>
    </header>
  );
};

export default Header;
