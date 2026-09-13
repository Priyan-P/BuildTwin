import React from 'react';
import { Link } from 'react-router-dom';
import { User, Palette, ShieldAlert, ArrowRight, Box } from 'lucide-react';

const RegisterPortalPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
            <Box className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Account Creation Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create Your BuildTwin Account
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Select your account type below to get started with 3D Digital Utility Twins.
          </p>
        </div>

        {/* 2 Registration Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          
          {/* CLIENT REGISTRATION CARD */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 text-left border-t-4 border-t-teal-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">CLIENT ACCOUNT</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For building owners, homeowners, and real estate developers looking to submit blueprints and access lifetime 3D utility twins.
              </p>
            </div>

            <Link
              to="/client/register"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow transition"
            >
              Create Client Account
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Link>
          </div>

          {/* DESIGNER REGISTRATION CARD */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 text-left border-t-4 border-t-purple-500">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">DESIGNER ACCOUNT</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For 3D modeling specialists, MEP engineers, and utility mappers. Applications are reviewed and approved by System Administrators.
              </p>
            </div>

            <Link
              to="/designer/register"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow transition"
            >
              Apply as Designer
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

        </div>

        {/* Restricted Admin Notice */}
        <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl border border-slate-800 flex items-center gap-3 text-xs text-left max-w-xl mx-auto">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">System Administrator Notice</span>
            <span>Public Admin registration is restricted. Admin accounts are provisioned exclusively by system administrators.</span>
          </div>
        </div>

        {/* Already have account */}
        <div className="pt-2 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-teal-700 hover:underline">
            Go to Login Portal
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPortalPage;
