import axios from 'axios';
import { API_URL } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  async (config) => {
    const { user } = useAuth.getState();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Manejar token expirado
      useAuth.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;