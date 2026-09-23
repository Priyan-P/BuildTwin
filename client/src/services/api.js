import axios from 'axios';

const API = axios.create({
  baseURL: 'https://buildtwin-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add Authorization header token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('buildtwin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;