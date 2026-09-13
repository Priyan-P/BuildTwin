import React from 'react';
import { Link } from 'react-router-dom';
import { User, Palette, Shield, ArrowRight, Box, Sparkles } from 'lucide-react';

const LoginPortalPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
            <Box className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            BuildTwin Role Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Login Portal
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            BuildTwin provides separate secure dashboards for Homeowners, Utility Designers, and Administrators.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* CLIENT CARD */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 text-left group border-t-4 border-t-teal-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                CLIENT PORTAL
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Client Login</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For homeowners, building clients, and property managers to submit blueprints, track progress, and inspect 3D twins.
              </p>
            </div>

            <Link
              to="/client/login"
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition group-hover:bg-teal-600"
            >
              Sign In as Client
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:text-white" />
            </Link>
          </div>

          {/* DESIGNER CARD */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 text-left group border-t-4 border-t-purple-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                DESIGNER PORTAL
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Designer Login</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For 3D modeling specialists and utility designers to construct spatial models and record electrical/plumbing routes.
              </p>
            </div>

            <Link
              to="/designer/login"
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition group-hover:bg-purple-600"
            >
              Sign In as Designer
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-white" />
            </Link>
          </div>

          {/* ADMIN CARD */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 text-left group border-t-4 border-t-amber-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ADMIN PORTAL
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Admin Login</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For platform administrators to oversee project requests, assign designers, manage approvals, and analyze analytics.
              </p>
            </div>

            <Link
              to="/admin/login"
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition group-hover:bg-amber-600"
            >
              Sign In as Admin
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-white" />
            </Link>
          </div>

        </div>

        {/* Footer Registration links */}
        <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-2">
          <p className="font-semibold text-slate-700">Don't have an account?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/client/register" className="font-bold text-teal-700 hover:underline flex items-center gap-1">
              Create Client Account →
            </Link>
            <span>•</span>
            <Link to="/designer/register" className="font-bold text-purple-700 hover:underline flex items-center gap-1">
              Apply for Designer Account →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPortalPage;
