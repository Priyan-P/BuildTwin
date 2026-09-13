import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { 
  PlusCircle, 
  FolderCheck, 
  Clock, 
  Calendar, 
  Eye, 
  ChevronRight, 
  Layers, 
  FileText,
  Sparkles,
  UserCheck
} from 'lucide-react';

const STATUS_PIPELINE = [
  'Submitted',
  'Under Review',
  'Approved',
  '3D Modeling',
  'Utility Mapping',
  'VR Development',
  'Client Review',
  'Revision',
  'Completed'
];

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const [projRes, bookRes] = await Promise.all([
        API.get('/projects'),
        API.get('/bookings')
      ]);
      if (projRes.data.success) {
        setProjects(projRes.data.projects || []);
      }
      if (bookRes.data.success) {
        setBookings(bookRes.data.bookings || []);
      }
    } catch (err) {
      console.warn('Error fetching client dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeCount = projects.filter(p => p.status !== 'Completed').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const pendingCount = projects.filter(p => p.status === 'Submitted' || p.status === 'Under Review').length;
  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length;

  const getStatusStepIndex = (status) => {
    const idx = STATUS_PIPELINE.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Client Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome Back, {user?.name || 'Homeowner'} 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Track your 3D building utility models, request updates, and inspect hidden electrical, plumbing & gas routes.
          </p>
        </div>

        <div className="z-10 shrink-0">
          <Link
            to="/book-project"
            className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-glow transition"
          >
            <PlusCircle className="w-4 h-4" />
            Book New Project
          </Link>
        </div>

        {/* Decorative ambient background */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] w-1/2"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{activeCount}</span>
            <span className="block text-xs text-slate-500 font-semibold">Active Projects</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <FolderCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{completedCount}</span>
            <span className="block text-xs text-slate-500 font-semibold">Completed Twins</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{pendingCount}</span>
            <span className="block text-xs text-slate-500 font-semibold">Pending Reviews</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{upcomingBookings}</span>
            <span className="block text-xs text-slate-500 font-semibold">Consultations</span>
          </div>
        </div>
      </div>

      {/* Projects List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">Your Building Projects</h2>
          <Link to="/book-project" className="text-xs font-bold text-teal-700 hover:underline">
            + Book Another Project
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-sm">
            Loading your digital twin projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Projects Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Submit your architectural blueprint to start creating your first 3D Digital Utility Twin.
            </p>
            <Link
              to="/book-project"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow"
            >
              <PlusCircle className="w-4 h-4 text-teal-400" />
              Book First Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => {
              const currentStepIdx = getStatusStepIndex(project.status);
              const targetId = project._id || project.projectId;

              return (
                <div
                  key={project._id || project.projectId}
                  className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-6 hover:shadow-xl transition"
                >
                  {/* Card Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                          ID: {project.projectId}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {project.buildingType} ({project.floors} Floors, {project.area} sq ft)
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">{project.projectName}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/projects/${targetId}/twin`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
                      >
                        <Eye className="w-4 h-4 text-teal-400" />
                        Open 3D Twin
                      </Link>
                      <Link
                        to={`/client/projects/${targetId}`}
                        className="flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition"
                      >
                        Details & Messages
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Status Timeline Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Project Status Progress:</span>
                      <span className="font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                        ● {project.status} (Version {project.currentVersion || 'v1.0'})
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                      {STATUS_PIPELINE.map((st, idx) => (
                        <div
                          key={st}
                          title={st}
                          className={`h-full flex-1 transition-all ${
                            idx <= currentStepIdx
                              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 border-r border-white/40'
                              : 'bg-slate-200'
                          }`}
                        ></div>
                      ))}
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold pt-1">
                      <span>1. Submitted</span>
                      <span>5. Utility Mapping</span>
                      <span>9. Completed</span>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
                    <span>Assigned Designer: <strong>{project.designerId?.name || 'Pending Assignment'}</strong></span>
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Consultations List */}
      <div id="consultations" className="space-y-4 pt-4">
        <h2 className="text-xl font-extrabold text-slate-900">Your Scheduled Consultations</h2>
        
        {bookings.length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
            No active consultation meetings scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookings.map((bk) => (
              <div key={bk._id || bk.bookingId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {bk.bookingId}
                  </span>
                  <span className="text-xs font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                    {bk.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{bk.projectName}</h4>
                <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
                  <span>📅 {bk.date} @ {bk.time}</span>
                  <span>🎥 {bk.meetingType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ClientDashboard;
