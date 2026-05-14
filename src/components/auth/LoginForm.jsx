import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Loader from '../shared/Loader';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#6366F1] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Welcome Back</h1>
          <p className="text-zinc-400 mt-1">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 placeholder-zinc-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-zinc-100 placeholder-zinc-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#6366F1] text-white py-2.5 rounded-lg font-medium hover:bg-[#5558E3] focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <Loader size="sm" /> : <><LogIn className="w-5 h-5" /> Sign In</>}
            </button>
          </form>

          <div className="mt-4 p-3 bg-zinc-800 rounded-lg">
            <p className="text-xs text-zinc-400 font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-zinc-500">
              <p>Employee: ashwet@example.com / 123456</p>
              <p>Manager: manager@example.com / 123456</p>
              <p>Admin: admin@example.com / 123456</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Work Hours: 9:30 AM - 6:30 PM • Mon-Fri
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
