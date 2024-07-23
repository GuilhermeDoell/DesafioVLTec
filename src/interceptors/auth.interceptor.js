import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);