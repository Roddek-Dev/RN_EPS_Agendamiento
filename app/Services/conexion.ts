import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

 const API_BASE_URL: string = 'http://192.168.1.6:8000/api'; //RODDEK
// const API_BASE_URL: string = 'http://172.30.4.119:8001/api'; //SENA


const RutasPublicas: string[] = ['/login', '/register'];

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isRutaPublica = RutasPublicas.some((route) =>
      config.url?.includes(route)
    );

    if (!isRutaPublica) {
      // ✅ CORRECCIÓN CLAVE: Usamos 'token' para ser consistentes con AuthContext
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      console.log("Token expirado o no autorizado. Se requerirá un nuevo login.");
      // Aquí podrías implementar una lógica para refrescar el token o redirigir al login.
      // Por ahora, simplemente borramos el token viejo.
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;