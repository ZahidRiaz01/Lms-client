import axios from 'axios';
import TokenService from '../lib/localStorageService';

const baseUrl = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      TokenService.removeToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
