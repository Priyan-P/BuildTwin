import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import {
  Box,
  LayoutDashboard,
  PlusCircle,
  Folder,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X,
  FileText,
  Shield,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications || []);
        const unread = (res.data.notifications || []).filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.warn('Could not fetch notifications');
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.warn(err);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const role = user.role;

  // Sidebar Links by Role
  const clientLinks = [
    { name: 'Dashboard', path: '/client/dashboard', icon: LayoutDashboard },
    { name: 'Book New Project', path: '/book-project', icon: PlusCircle },
    { name: 'My Consultations', path: '/client/dashboard#consultations', icon: Calendar },
    { name: 'Services Directory', path: '/services', icon: Layers }
  ];

  const designerLinks = [
    { name: 'Designer Workspace', path: '/designer/dashboard', icon: LayoutDashboard },
    { name: 'Assigned Projects', path: '/designer/dashboard#projects', icon: FileText },
    { name: 'Consultation Calendar', path: '/designer/dashboard#bookings', icon: Calendar }
  ];

  const adminLinks = [
    { name: 'Admin Command Center', path: '/admin/dashboard', icon: Shield },
    { name: 'Projects Manager', path: '/admin/dashboard#projects', icon: FileText },
    { name: 'User Management', path: '/admin/dashboard#users', icon: Users },
    { name: 'Consultation Bookings', path: '/admin/dashboard#bookings', icon: Calendar },
    { name: 'Contact Submissions', path: '/admin/dashboard#contacts', icon: MessageSquare }
  ];

  const currentLinks = role === 'admin' ? adminLinks : role === 'designer' ? designerLinks : clientLinks;

  const isActive = (path) => location.pathname === path || (path.includes('#') && location.pathname + location.hash === path);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 min-h-screen sticky top-0 h-screen">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">BuildTwin</span>
              <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-wider -mt-1">
                {role} Hub
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate capitalize">{user.role} Account</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Navigation Menu
          </div>
          {currentLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'bg-teal-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(link.path) ? 'text-white' : 'text-teal-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Platform Links
          </div>
          <Link
            to="/services"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            Explore Services
          </Link>
          <Link
            to="/how-it-works"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Sparkles className="w-4 h-4 text-slate-400" />
            How It Works
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-300 text-sm font-medium transition border border-slate-700 hover:border-rose-800"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top App Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="capitalize">{role} Portal</span>
              <span className="hidden sm:inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                BuildTwin PWA
              </span>
            </h1>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div 
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setShowNotifications(false)}
                >
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-semibold">
                      {unreadCount} unread
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-400">No new notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => {
                            markNotificationRead(notif._id);
                            if (notif.link) navigate(notif.link);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition ${
                            !notif.isRead ? 'bg-teal-50/40 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold text-slate-900 mb-0.5">
                            <span>{notif.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-slate-600">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg transition"
            >
              Public Site
              <ExternalLink className="w-3 h-3" />
            </Link>

          </div>

        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
          <Outlet />
        </main>

      </div>

      {/* Mobile Bottom Navigation Bar (PWA standard) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-40 flex items-center justify-around py-2 px-1 text-slate-400">
        {currentLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg ${
                isActive(link.path) ? 'text-teal-400 font-bold' : 'hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate max-w-[70px]">{link.name}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default DashboardLayout;
