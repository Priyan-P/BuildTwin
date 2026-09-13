import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Palette, Mail, Phone, Lock, ArrowRight, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

const DesignerRegisterPage = () => {
  const { designerRegister, authError } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState('Architectural 3D Modeling');
  const [experience, setExperience] = useState('3-5 Years');
  const [skills, setSkills] = useState('3D Modeling, Electrical Routing');
  
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setSubmitting(true);
    const parsedSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
    const res = await designerRegister({
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      skills: parsedSkills
    });
    setSubmitting(false);

    if (res?.success) {
      addToast('Designer registration submitted!', 'success');
      setSubmittedSuccess(true);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Pending Admin Approval
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Application Submitted!</h2>
          <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
            Thank you for applying as a BuildTwin Utility Designer. Your account status is <strong>pending Admin verification</strong>. Once approved, you can log in to your Designer Workspace.
          </p>
        </div>

        <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-xs space-y-1 text-left">
          <p><strong>Applicant Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Specialization:</strong> {specialization}</p>
          <p><strong>Status:</strong> <span className="text-amber-400 font-bold">Pending Review</span></p>
        </div>

        <div className="pt-2">
          <Link
            to="/designer/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Go to Designer Login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl border-t-4 border-t-purple-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto shadow-md">
            <Palette className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
            DESIGNER APPLICATION
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Apply as BuildTwin Designer</h2>
          <p className="text-xs text-slate-500">Join our team of 3D modeling and utility mapping specialists.</p>
        </div>

        {(localError || authError) && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {localError || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Elena Rostova"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="elena@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 876-5432"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Specialization *</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="Architectural 3D Modeling">Architectural 3D Modeling</option>
                <option value="Electrical Utility Mapping">Electrical Utility Mapping</option>
                <option value="Plumbing / Pipeline Mapping">Plumbing / Pipeline Mapping</option>
                <option value="VR Development">VR Development</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Experience</label>
              <input
                type="text"
                placeholder="e.g. 5 Years MEP Design"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Technical Skills (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. AutoCAD, Revit, Three.js, Conduit Routing"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Note: Designer accounts require System Administrator approval before login is enabled.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {submitting ? 'Submitting Application...' : 'Submit Designer Application'}
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already approved?{' '}
          <Link to="/designer/login" className="font-bold text-purple-700 hover:underline">
            Designer Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DesignerRegisterPage;
