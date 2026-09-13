import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Box, Lock, Mail, ArrowRight, User, Shield, Palette, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const { login, quickDemoLogin, authError } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res?.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      redirectByRole(res.user.role);
    }
  };

  const handleDemoClick = async (role) => {
    setSubmitting(true);
    const res = await quickDemoLogin(role);
    setSubmitting(false);
    if (res?.success) {
      addToast(`Logged in as Demo ${role.toUpperCase()}: ${res.user.name}`, 'success');
      redirectByRole(res.user.role);
    }
  };

  const redirectByRole = (role) => {
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'designer') navigate('/designer/dashboard');
    else navigate('/client/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
            <Box className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Sign In to BuildTwin</h2>
          <p className="text-xs text-slate-500">Access your Digital Utility Twin dashboard & models</p>
        </div>

        {/* Quick Demo Login Preset Banner */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            1-Click Demo Quick Login
          </div>
          <p className="text-[11px] text-slate-300">
            Test full features immediately as Client, Designer, or Admin:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleDemoClick('client')}
              disabled={submitting}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-teal-950 text-teal-300 hover:bg-teal-900 text-[11px] font-bold border border-teal-800 transition"
            >
              <User className="w-3 h-3" />
              Client
            </button>
            <button
              onClick={() => handleDemoClick('designer')}
              disabled={submitting}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-purple-950 text-purple-300 hover:bg-purple-900 text-[11px] font-bold border border-purple-800 transition"
            >
              <Palette className="w-3 h-3" />
              Designer
            </button>
            <button
              onClick={() => handleDemoClick('admin')}
              disabled={submitting}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-amber-950 text-amber-300 hover:bg-amber-900 text-[11px] font-bold border border-amber-800 transition"
            >
              <Shield className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {authError}
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="client@buildtwin.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-teal-700 hover:underline">
            Create Client Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
