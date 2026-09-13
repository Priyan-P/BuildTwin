import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import API from '../../services/api';
import VersionHistoryModal from '../../components/common/VersionHistoryModal';
import { 
  Palette, 
  Layers, 
  Eye, 
  Download, 
  MessageSquare, 
  History, 
  CheckCircle2, 
  Clock, 
  FileText,
  Send,
  Plus
} from 'lucide-react';

const STATUS_OPTIONS = [
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

const DesignerDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [versions, setVersions] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  useEffect(() => {
    fetchDesignerProjects();
  }, []);

  const fetchDesignerProjects = async () => {
    try {
      const res = await API.get('/projects');
      if (res.data.success) {
        setProjects(res.data.projects || []);
        if (res.data.projects && res.data.projects.length > 0) {
          selectProject(res.data.projects[0]);
        }
      }
    } catch (err) {
      addToast('Failed to load assigned designer projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectProject = async (proj) => {
    setSelectedProject(proj);
    const targetId = proj._id || proj.projectId;

    try {
      const [msgRes, verRes] = await Promise.all([
        API.get(`/projects/${targetId}/messages`),
        API.get(`/projects/${targetId}/versions`)
      ]);
      if (msgRes.data.success) setMessages(msgRes.data.messages || []);
      if (verRes.data.success) setVersions(verRes.data.versions || []);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedProject) return;
    const targetId = selectedProject._id || selectedProject.projectId;

    try {
      const res = await API.put(`/projects/${targetId}/status`, { status: newStatus });
      if (res.data.success) {
        addToast(`Updated project status to: ${newStatus}`, 'success');
        setSelectedProject({ ...selectedProject, status: newStatus });
        setProjects(projects.map(p => (p._id === targetId || p.projectId === targetId) ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedProject) return;
    const targetId = selectedProject._id || selectedProject.projectId;

    try {
      const res = await API.post(`/projects/${targetId}/messages`, { message: newMessage });
      if (res.data.success) {
        setMessages(prev => [...prev, res.data.message]);
        setNewMessage('');
        addToast('Message sent to client', 'success');
      }
    } catch (err) {
      addToast('Failed to send message', 'error');
    }
  };

  const handleAddVersion = async (verData) => {
    if (!selectedProject) return;
    const targetId = selectedProject._id || selectedProject.projectId;

    try {
      const res = await API.post(`/projects/${targetId}/versions`, verData);
      if (res.data.success) {
        addToast(`Created version ${verData.versionNumber}`, 'success');
        setVersions(prev => [res.data.version, ...prev]);
        setSelectedProject({ ...selectedProject, currentVersion: verData.versionNumber });
      }
    } catch (err) {
      addToast('Failed to create project version', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Designer Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Designer Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Lead MEP & Utility Designer
          </h1>
          <p className="text-xs text-slate-300">
            Logged in as <strong>{user?.name}</strong> • Managing 3D Models & Utility Mapping Routes
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-950 text-purple-300 text-xs font-bold rounded-lg border border-purple-800">
            {projects.length} Assigned Projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assigned Projects List */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Your Assigned Projects</h2>

          {loading ? (
            <div className="p-6 text-center text-xs text-slate-500">Loading assigned projects...</div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-2xl border">
              No projects assigned yet.
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => {
                const isSelected = selectedProject && (selectedProject._id === p._id || selectedProject.projectId === p.projectId);
                return (
                  <div
                    key={p._id || p.projectId}
                    onClick={() => selectProject(p)}
                    className={`p-4 rounded-2xl border cursor-pointer transition shadow-xs ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-800 ring-2 ring-purple-500'
                        : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className={isSelected ? 'text-teal-400' : 'text-teal-700'}>{p.projectId}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${isSelected ? 'bg-slate-800 text-purple-300' : 'bg-slate-100 text-slate-700'}`}>
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm truncate">{p.projectName}</h3>
                    <p className={`text-[11px] truncate ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                      Client: {p.clientId?.name || 'Client'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Selected Project Detail & Controls */}
        <div className="lg:col-span-8 space-y-6">
          {selectedProject ? (
            <>
              {/* Project Workspace Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {selectedProject.projectId}
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedProject.projectName}</h2>
                    <p className="text-xs text-slate-500">
                      Client: {selectedProject.clientId?.name} ({selectedProject.clientId?.email})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/projects/${selectedProject._id || selectedProject.projectId}/twin`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                    >
                      <Eye className="w-4 h-4 text-teal-400" />
                      3D Twin Viewer
                    </Link>

                    <button
                      onClick={() => setIsVersionModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs rounded-xl hover:bg-purple-100"
                    >
                      <History className="w-4 h-4 text-purple-600" />
                      Version Log ({selectedProject.currentVersion || 'v1.0'})
                    </button>
                  </div>
                </div>

                {/* Status Progression Control Bar */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Advance Lifecycle Status:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUS_OPTIONS.map((st) => {
                      const isCurrent = selectedProject.status === st;
                      return (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(st)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                            isCurrent
                              ? 'bg-purple-600 text-white font-bold shadow'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Blueprint & Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-500">Uploaded Blueprint</h4>
                  {selectedProject.blueprintFile?.originalName ? (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 truncate max-w-[160px]">
                        {selectedProject.blueprintFile.originalName}
                      </span>
                      <a
                        href={selectedProject.blueprintFile.path || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-slate-900 text-white rounded text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3 text-teal-400" />
                        Download
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No blueprint file attached</span>
                  )}
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-500">Client Requirements</h4>
                  <p className="text-xs text-slate-700 line-clamp-3">
                    {selectedProject.description || 'No special requirements listed.'}
                  </p>
                </div>
              </div>

              {/* Designer ↔ Client Live Messages */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    Direct Client Collaboration Chat
                  </h3>
                  <span className="text-xs text-slate-400">{messages.length} messages</span>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-2 text-xs pr-1">
                  {messages.map((m) => {
                    const isDesigner = m.senderRole === 'designer';
                    return (
                      <div
                        key={m._id || m.messageId}
                        className={`p-3 rounded-xl ${
                          isDesigner ? 'bg-purple-950 text-purple-100 ml-8' : 'bg-slate-100 text-slate-900 mr-8'
                        }`}
                      >
                        <div className="flex justify-between font-bold text-[10px] opacity-75 mb-1">
                          <span>{m.senderName} ({m.senderRole})</span>
                          <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p>{m.message}</p>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Send update or question to client..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border">
              Select a project from the left queue to manage.
            </div>
          )}
        </div>

      </div>

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        versions={versions}
        onAddVersion={handleAddVersion}
        isDesigner={true}
      />

    </div>
  );
};

export default DesignerDashboard;
