
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE_URL: string = "http://172.30.4.119:8001/api"; 
const RutasPublicas: string[] = ['/login', '/register'];

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR DE SOLICITUD (REQUEST) ---
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isRutaPublica = RutasPublicas.some((route) =>
      config.url?.includes(route)
    );

    if (!isRutaPublica) {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // Los headers ya están definidos y son seguros de mutar en InternalAxiosRequestConfig
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR DE RESPUESTA (RESPONSE) ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const isRutaPublica = RutasPublicas.some((route) =>
      originalRequest?.url?.includes(route)
    );

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?._retry &&
      !isRutaPublica
    ) {
      if (originalRequest) {
        originalRequest._retry = true;
      }

      console.log("Token expirado o no autorizado. Redirigiendo al login.");
      await AsyncStorage.removeItem("userToken");
    }

    return Promise.reject(error);
  }
);

export default api;