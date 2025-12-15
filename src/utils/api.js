import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Log API URL for debugging (only once)
if (!window.__API_URL_LOGGED) {
  console.log('API Base URL:', API_BASE_URL);
  window.__API_URL_LOGGED = true;
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRedirecting = false; 
let networkErrorLogged = false;
let lastNetworkErrorTime = 0;

api.interceptors.response.use(
  (response) => {
    networkErrorLogged = false;
    return response;
  },
  (error) => {
    const now = Date.now();
    
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      if (!networkErrorLogged || (now - lastNetworkErrorTime) > 5000) {
        console.error('Network Error: Cannot reach server at', API_BASE_URL);
        console.error('Please check:');
        console.error('1. Is the server running on port 5000?');
        console.error('2. Is the API URL correct?', API_BASE_URL);
        console.error('3. Check CORS configuration on server');
        networkErrorLogged = true;
        lastNetworkErrorTime = now;
      }
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      
      if (!isRedirecting && currentPath !== '/login' && currentPath !== '/register') {
        isRedirecting = true;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

