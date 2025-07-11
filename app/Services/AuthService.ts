import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

interface ValidationError {
  message: string;
  errors: { [key: string]: string[] };
}

// --- FUNCIONES DEL SERVICIO ---

export const register = async (
  data: RegisterData
): Promise<{ success: true; data: AuthResponse } | { success: false; message: string }> => {
  try {
    const response = await api.post<AuthResponse>('/register', data);
    // Verificamos que la respuesta tenga el formato esperado
    if (response.data && response.data.token && response.data.user) {
      return { success: true, data: response.data };
    }
    return { success: false, message: 'Respuesta inválida desde el servidor.' };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data as ValidationError;
      if (errorData.errors) {
        return { success: false, message: Object.values(errorData.errors)[0][0] };
      }
      return { success: false, message: errorData.message || 'Error al registrar.' };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};

export const login = async (
  data: LoginData
): Promise<{ success: true; data: AuthResponse } | { success: false; message: string }> => {
  try {
    const response = await api.post<AuthResponse>('/login', data);
    // ✅ CORRECCIÓN CLAVE: Nos aseguramos de que el token exista en la respuesta
    if (response.data && response.data.token && response.data.user) {
      return { success: true, data: response.data };
    }
    // Si no hay token, la autenticación falló aunque la API respondiera 200 OK
    return { success: false, message: 'Respuesta del servidor incompleta. No se encontró el token.' };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      return { success: false, message: errorData.message || 'Email o contraseña incorrectos.' };
    }
    return { success: false, message: 'Error de conexión. Inténtalo de nuevo.' };
  }
};

export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.post('/logout');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'No se pudo cerrar la sesión.' };
  }
};