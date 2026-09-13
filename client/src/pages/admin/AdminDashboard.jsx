import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import API from '../../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { 
  Shield, 
  Users, 
  Folder, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  Calendar, 
  MessageSquare,
  FileText,
  UserCheck,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#64748b'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [stats, setStats] = useState({});
  const [charts, setCharts] = useState({});
  const [projects, setProjects] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Designer creation modal
  const [showCreateDesigner, setShowCreateDesigner] = useState(false);
  const [designerForm, setDesignerForm] = useState({ name: '', email: '', password: '', phone: '' });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, projRes, usersRes, contactRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/projects'),
        API.get('/admin/users'),
        API.get('/contact')
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats || {});
        setCharts(statsRes.data.charts || {});
      }
      if (projRes.data.success) setProjects(projRes.data.projects || []);
      if (usersRes.data.success) setUsersList(usersRes.data.users || []);
      if (contactRes.data.success) setContactMessages(contactRes.data.messages || []);
    } catch (err) {
      addToast('Failed to load admin analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignDesigner = async (projectId, designerId) => {
    try {
      const res = await API.put(`/projects/${projectId}/assign`, { designerId });
      if (res.data.success) {
        addToast('Designer assigned to project', 'success');
        fetchAdminData();
      }
    } catch (err) {
      addToast('Failed to assign designer', 'error');
    }
  };

  const handleCreateDesignerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/admin/create-designer', designerForm);
      if (res.data.success) {
        addToast(`Designer account created: ${designerForm.name}`, 'success');
        setShowCreateDesigner(false);
        setDesignerForm({ name: '', email: '', password: '', phone: '' });
        fetchAdminData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create designer account', 'error');
    }
  };

  const designersList = usersList.filter(u => u.role === 'designer');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">System Administrator</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            BuildTwin Command Center
          </h1>
          <p className="text-xs text-slate-300">
            Platform Overview • Enterprise Project Audits & Designer Management
          </p>
        </div>

        <button
          onClick={() => setShowCreateDesigner(true)}
          className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-glow transition"
        >
          <UserPlus className="w-4 h-4" />
          Create Designer Account
        </button>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Total Clients</span>
          <span className="text-2xl font-black text-slate-900">{stats.totalClients || 0}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Total Designers</span>
          <span className="text-2xl font-black text-purple-700">{stats.totalDesigners || 0}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Total Projects</span>
          <span className="text-2xl font-black text-slate-900">{stats.totalProjects || 0}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Active Twins</span>
          <span className="text-2xl font-black text-teal-700">{stats.activeProjects || 0}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Completed</span>
          <span className="text-2xl font-black text-emerald-700">{stats.completedProjects || 0}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-500 font-semibold block">Pending Intakes</span>
          <span className="text-2xl font-black text-amber-700">{stats.pendingRequests || 0}</span>
        </div>

      </div>

      {/* Visual Analytics Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Projects by Status (Bar Chart) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            Projects Pipeline by Status
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.projectsByStatus || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Building Type Breakdown (Pie Chart) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Folder className="w-4 h-4 text-purple-600" />
            Projects by Building Type
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.projectsByBuildingType || []}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {(charts.projectsByBuildingType || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Pending Designer Approvals Table */}
      {usersList.filter(u => u.role === 'designer' && u.status === 'pending').length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-3xl space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <h3 className="text-lg font-extrabold text-amber-950">Pending Designer Registration Applications</h3>
            </div>
            <span className="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
              {usersList.filter(u => u.role === 'designer' && u.status === 'pending').length} Pending Approval
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs bg-white rounded-2xl overflow-hidden border border-amber-200">
              <thead>
                <tr className="bg-amber-100/50 text-amber-950 border-b border-amber-200">
                  <th className="p-3 font-bold">Applicant Name</th>
                  <th className="p-3 font-bold">Email</th>
                  <th className="p-3 font-bold">Specialization</th>
                  <th className="p-3 font-bold">Experience</th>
                  <th className="p-3 font-bold">Applied Date</th>
                  <th className="p-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {usersList.filter(u => u.role === 'designer' && u.status === 'pending').map((d) => (
                  <tr key={d.id || d._id} className="hover:bg-amber-50/50">
                    <td className="p-3 font-bold text-slate-900">{d.name}</td>
                    <td className="p-3 text-slate-700">{d.email}</td>
                    <td className="p-3 font-semibold text-purple-700">{d.specialization || '3D Modeling'}</td>
                    <td className="p-3 text-slate-600">{d.experience || 'Professional'}</td>
                    <td className="p-3 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={async () => {
                          try {
                            const res = await API.put(`/admin/designers/${d.id || d._id}/approve`);
                            if (res.data.success) {
                              addToast(`Approved designer ${d.name}!`, 'success');
                              fetchAdminData();
                            }
                          } catch (err) {
                            addToast('Failed to approve designer', 'error');
                          }
                        }}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                      >
                        ✓ Approve Designer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Master Projects Management Table */}
      <div id="projects" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Master Projects & Designer Assignment</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3 font-bold">Project ID</th>
                <th className="p-3 font-bold">Project Name</th>
                <th className="p-3 font-bold">Building Type</th>
                <th className="p-3 font-bold">Client</th>
                <th className="p-3 font-bold">Assigned Designer</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => {
                const targetId = p._id || p.projectId;
                return (
                  <tr key={p._id || p.projectId} className="hover:bg-slate-50">
                    <td className="p-3 font-extrabold text-teal-700">{p.projectId}</td>
                    <td className="p-3 font-bold text-slate-900">{p.projectName}</td>
                    <td className="p-3 text-slate-600">{p.buildingType}</td>
                    <td className="p-3 text-slate-700">{p.clientId?.name || 'Client'}</td>
                    <td className="p-3">
                      <select
                        value={p.designerId?._id || p.designerId || ''}
                        onChange={(e) => handleAssignDesigner(targetId, e.target.value)}
                        className="px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:ring-1 focus:ring-teal-500"
                      >
                        <option value="">-- Assign Designer --</option>
                        {designersList.map((d) => (
                          <option key={d.id || d._id} value={d.id || d._id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`/projects/${targetId}/twin`}
                        className="text-xs font-bold text-slate-900 hover:text-teal-600"
                      >
                        Open 3D →
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Submissions Viewer */}
      <div id="contacts" className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-600" />
          Public Contact Form Messages ({contactMessages.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMessages.map((c) => (
            <div key={c._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{c.name} ({c.email})</span>
                <span className="text-slate-400 font-normal">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="font-semibold text-teal-700">Subject: {c.subject}</p>
              <p className="text-slate-600">{c.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Designer Modal */}
      {showCreateDesigner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Create Designer Account</h3>
              <button onClick={() => setShowCreateDesigner(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDesignerSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={designerForm.name}
                  onChange={(e) => setDesignerForm({ ...designerForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="designer@buildtwin.demo"
                  value={designerForm.email}
                  onChange={(e) => setDesignerForm({ ...designerForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={designerForm.password}
                  onChange={(e) => setDesignerForm({ ...designerForm, password: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-1111"
                  value={designerForm.phone}
                  onChange={(e) => setDesignerForm({ ...designerForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateDesigner(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow"
                >
                  Create Designer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
