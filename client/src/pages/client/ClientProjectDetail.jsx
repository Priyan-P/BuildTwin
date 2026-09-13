import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import API from '../../services/api';
import VersionHistoryModal from '../../components/common/VersionHistoryModal';
import { 
  Box, 
  Eye, 
  MessageSquare, 
  History, 
  Download, 
  FileText, 
  Send, 
  Calendar, 
  UserCheck, 
  Layers,
  ArrowLeft,
  CheckCircle2,
  Clock
} from 'lucide-react';

const ClientProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [versions, setVersions] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const [projRes, msgRes, verRes] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(`/projects/${id}/messages`),
        API.get(`/projects/${id}/versions`)
      ]);

      if (projRes.data.success) setProject(projRes.data.project);
      if (msgRes.data.success) setMessages(msgRes.data.messages || []);
      if (verRes.data.success) setVersions(verRes.data.versions || []);
    } catch (err) {
      addToast('Failed to load project details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSendingMsg(true);

    try {
      const res = await API.post(`/projects/${id}/messages`, { message: newMessage });
      if (res.data.success) {
        setMessages(prev => [...prev, res.data.message]);
        setNewMessage('');
        addToast('Message sent to designer', 'success');
      }
    } catch (err) {
      addToast('Failed to send message', 'error');
    } finally {
      setSendingMsg(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading project workspace...</div>;
  }

  if (!project) {
    return <div className="p-12 text-center text-rose-500 font-bold">Project not found</div>;
  }

  const targetId = project._id || project.projectId;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/client/dashboard" className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Project ID: {project.projectId}
        </span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-teal-400 font-bold">
            <span>{project.buildingType}</span>
            <span>•</span>
            <span>{project.area} sq ft</span>
            <span>•</span>
            <span>{project.floors} Floors</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">{project.projectName}</h1>
          <p className="text-xs text-slate-300">
            Location: {project.location || 'Not specified'} | Construction Stage: {project.constructionStage}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/projects/${targetId}/twin`}
            className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-glow transition"
          >
            <Eye className="w-4 h-4" />
            Launch 3D Utility Twin
          </Link>

          <button
            onClick={() => setIsVersionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-2xl border border-slate-700 transition"
          >
            <History className="w-4 h-4 text-teal-400" />
            Version History ({project.currentVersion || 'v1.0'})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Project Specs & Files */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status & Designer Info Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Project Status & Assigned Team
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Current Phase</span>
                <p className="text-base font-extrabold text-teal-700">{project.status}</p>
                <p className="text-[11px] text-slate-500">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Assigned Designer</span>
                <p className="text-base font-extrabold text-slate-900">
                  {project.designerId?.name || 'Pending Assignment'}
                </p>
                <p className="text-[11px] text-slate-500">{project.designerId?.email || 'Assigning soon...'}</p>
              </div>
            </div>
          </div>

          {/* Requested Services */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Requested Utility Mapping Services
            </h3>

            <div className="flex flex-wrap gap-2">
              {(project.services || []).map((srv, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-teal-50 text-teal-800 rounded-xl text-xs font-bold border border-teal-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* Blueprint & Uploaded Files */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Architectural Blueprint & Files</span>
              <span className="text-xs text-slate-400">1 File</span>
            </h3>

            {project.blueprintFile?.originalName ? (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{project.blueprintFile.originalName}</p>
                    <p className="text-[10px] text-slate-500">Format: {project.blueprintFile.fileType || 'PDF / DWG'}</p>
                  </div>
                </div>

                <a
                  href={project.blueprintFile.path || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  Download
                </a>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No blueprint file attached.</p>
            )}
          </div>

        </div>

        {/* Right Col: Live Designer Messaging */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col justify-between h-[600px]">
          
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">Project Messages</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">{messages.length} messages</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No messages yet. Send a note to your assigned utility designer below.
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === (user._id || user.id) || msg.senderRole === 'client';
                return (
                  <div
                    key={msg._id || msg.messageId}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] text-xs space-y-1 ${
                        isMe
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-teal-50 text-teal-950 rounded-bl-none border border-teal-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-semibold">
                        <span>{msg.senderName}</span>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Send Box */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Type message to utility designer..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={sendingMsg || !newMessage.trim()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5 text-teal-400" />
              Send
            </button>
          </form>

        </div>

      </div>

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        versions={versions}
        isDesigner={false}
      />

    </div>
  );
};

export default ClientProjectDetail;
