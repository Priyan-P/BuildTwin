import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Shield, Lock, Mail, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
  const { adminLogin, quickDemoLogin, authError } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await adminLogin(email, password);
    setSubmitting(false);

    if (res?.success) {
      addToast(`Administrator authenticated: ${res.user.name}`, 'success');
      navigate('/admin/dashboard');
    }
  };

  const handleDemoClick = async () => {
    setSubmitting(true);
    const res = await quickDemoLogin('admin');
    setSubmitting(false);

    if (res?.success) {
      addToast(`Logged in as System Admin: ${res.user.name}`, 'success');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl border-t-4 border-t-amber-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
            SYSTEM ADMINISTRATOR ACCESS
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Admin Login</h2>
          <p className="text-xs text-slate-500">Manage BuildTwin projects, clients, designers and operations.</p>
        </div>

        {/* Quick Demo Option */}
        <div className="bg-amber-950 text-amber-100 p-3.5 rounded-2xl border border-amber-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Admin Predefined Account</span>
          </div>
          <button
            onClick={handleDemoClick}
            disabled={submitting}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[11px] transition shadow"
          >
            1-Click Demo Sign In
          </button>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Access Restricted</span>
            </div>
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="admin@buildtwin.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Mode: Use 'admin123' as password."); }} className="text-[11px] font-semibold text-amber-700 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {submitting ? 'Authenticating Administrator...' : 'Sign In as Admin'}
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </form>

        {/* System Admin Notice */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
          Admin accounts are created by the system administrator.
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          <Link to="/login" className="text-slate-400 hover:text-slate-700">
            ← Return to Role Selection Portal
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
