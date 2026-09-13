import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Palette, Lock, Mail, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';

const DesignerLoginPage = () => {
  const { designerLogin, quickDemoLogin, authError } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await designerLogin(email, password);
    setSubmitting(false);

    if (res?.success) {
      addToast(`Designer authentication successful: ${res.user.name}`, 'success');
      navigate('/designer/dashboard');
    }
  };

  const handleDemoClick = async () => {
    setSubmitting(true);
    const res = await quickDemoLogin('designer');
    setSubmitting(false);

    if (res?.success) {
      addToast(`Logged in as Designer: ${res.user.name}`, 'success');
      navigate('/designer/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl border-t-4 border-t-purple-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto shadow-md">
            <Palette className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
            UTILITY DESIGNER ACCESS
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Designer Login</h2>
          <p className="text-xs text-slate-500">Manage assigned building models and utility mapping projects.</p>
        </div>

        {/* Quick Demo Option */}
        <div className="bg-purple-950 text-purple-100 p-3.5 rounded-2xl border border-purple-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Active Designer Demo</span>
          </div>
          <button
            onClick={handleDemoClick}
            disabled={submitting}
            className="px-3 py-1.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-extrabold rounded-lg text-[11px] transition shadow"
          >
            1-Click Demo Sign In
          </button>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Authentication Restricted</span>
            </div>
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Designer Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="designer@buildtwin.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Mode: Use 'designer123' as password."); }} className="text-[11px] font-semibold text-purple-700 hover:underline">
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
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {submitting ? 'Authenticating Designer...' : 'Sign In as Designer'}
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
          <p>
            Need a Designer account?{' '}
            <Link to="/designer/register" className="font-bold text-purple-700 hover:underline">
              Create Designer Account
            </Link>
          </p>
          <p>
            <Link to="/login" className="text-slate-400 hover:text-slate-700">
              ← Return to Role Selection Portal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default DesignerLoginPage;
