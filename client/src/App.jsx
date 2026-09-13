import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import PortfolioPage from './pages/public/PortfolioPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';

// Auth & Portal Pages
import LoginPortalPage from './pages/auth/LoginPortalPage';
import RegisterPortalPage from './pages/auth/RegisterPortalPage';
import ClientLoginPage from './pages/auth/ClientLoginPage';
import DesignerLoginPage from './pages/auth/DesignerLoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import ClientRegisterPage from './pages/auth/ClientRegisterPage';
import DesignerRegisterPage from './pages/auth/DesignerRegisterPage';

// Protected App Pages
import BookProjectPage from './pages/client/BookProjectPage';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProjectDetail from './pages/client/ClientProjectDetail';
import DesignerDashboard from './pages/designer/DesignerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import TwinViewerPage from './pages/public/TwinViewerPage';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'designer') return <Navigate to="/designer/dashboard" replace />;
    return <Navigate to="/client/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Auth Portals & Specific Logins/Registers */}
        <Route path="/login" element={<LoginPortalPage />} />
        <Route path="/register" element={<RegisterPortalPage />} />
        <Route path="/client/login" element={<ClientLoginPage />} />
        <Route path="/designer/login" element={<DesignerLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/client/register" element={<ClientRegisterPage />} />
        <Route path="/designer/register" element={<DesignerRegisterPage />} />

        <Route
          path="/book-project"
          element={
            <ProtectedRoute allowedRoles={['client', 'designer', 'admin']}>
              <BookProjectPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Dashboard App Pages (Sidebar & Header Layout) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['client', 'designer', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={['client', 'admin']}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/projects/:id"
          element={
            <ProtectedRoute allowedRoles={['client', 'designer', 'admin']}>
              <ClientProjectDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/designer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['designer', 'admin']}>
              <DesignerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Full-screen 3D Digital Utility Twin Viewer */}
      <Route
        path="/projects/:id/twin"
        element={
          <ProtectedRoute allowedRoles={['client', 'designer', 'admin']}>
            <TwinViewerPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
