import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('buildtwin_token') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('Token expired or invalid, logging out');
          logout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [token]);

  const clientLogin = async (email, password) => {
    setAuthError(null);
    try {
      const res = await API.post('/auth/client/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('buildtwin_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Client login failed. Please check your credentials.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const designerLogin = async (email, password) => {
    setAuthError(null);
    try {
      const res = await API.post('/auth/designer/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('buildtwin_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Designer login failed. Please check your credentials or account status.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const adminLogin = async (email, password) => {
    setAuthError(null);
    try {
      const res = await API.post('/auth/admin/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('buildtwin_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Admin login failed. Please check administrator credentials.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const clientRegister = async (name, email, password, phone) => {
    setAuthError(null);
    try {
      const res = await API.post('/auth/client/register', { name, email, password, phone });
      if (res.data.success) {
        localStorage.setItem('buildtwin_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Client registration failed.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const designerRegister = async (designerData) => {
    setAuthError(null);
    try {
      const res = await API.post('/auth/designer/register', designerData);
      if (res.data.success) {
        return { success: true, user: res.data.user, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Designer application failed.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const quickDemoLogin = async (role = 'client') => {
    let email = 'client@buildtwin.demo';
    let password = 'client123';
    if (role === 'designer') {
      email = 'designer@buildtwin.demo';
      password = 'designer123';
      return await designerLogin(email, password);
    } else if (role === 'admin') {
      email = 'admin@buildtwin.demo';
      password = 'admin123';
      return await adminLogin(email, password);
    }
    return await clientLogin(email, password);
  };

  const logout = () => {
    localStorage.removeItem('buildtwin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authError,
        clientLogin,
        designerLogin,
        adminLogin,
        clientRegister,
        designerRegister,
        logout,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
