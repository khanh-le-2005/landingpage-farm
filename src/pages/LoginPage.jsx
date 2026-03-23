import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid email or password. Use admin@gmail.com / 123456');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-base) px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-2xl bg-(--bg-card) border border-(--glass-border) shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-green to-green-soft rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-(--text-primary)">Admin Login</h2>
          <p className="text-(--text-muted) text-sm mt-2">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-(--bg-base) border border-(--glass-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green text-(--text-primary) transition-all"
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-secondary) mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-(--bg-base) border border-(--glass-border) rounded-xl focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green text-(--text-primary) transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-green to-green-soft text-white font-bold rounded-xl shadow-lg shadow-green/20 hover:shadow-green/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-(--text-muted) hover:text-(--text-primary) text-sm transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
