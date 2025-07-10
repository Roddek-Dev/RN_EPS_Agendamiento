import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---

// Lo que tu API de Laravel debería devolver en un login/registro exitoso
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
}

// Datos para el registro
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string; // Laravel espera esto por defecto
}

// Datos para el login
export interface LoginData {
  email: string;
  password: string;
}

// Estructura de un error de validación de Laravel
interface ValidationError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Registra un nuevo usuario.
 */
export const register = async (
  data: RegisterData
): Promise<
  { success: true; data: AuthResponse } | { success: false; message: string }
> => {
  try {
    const response = await api.post<AuthResponse>('/register', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Capturamos errores de validación de Laravel
      const errorData = error.response.data as ValidationError;
      if (errorData.errors) {
        // Devolvemos el primer error de validación que encontremos
        const firstError = Object.values(errorData.errors)[0][0];
        return { success: false, message: firstError };
      }
      return {
        success: false,
        message: errorData.message || 'Error al registrar el usuario.',
      };
    }
    return {
      success: false,
      message: 'Error de conexión. Inténtalo de nuevo.',
    };
  }
};

/**
 * Inicia sesión de un usuario.
 */
export const login = async (
  data: LoginData
): Promise<
  { success: true; data: AuthResponse } | { success: false; message: string }
> => {
  try {
    const response = await api.post<AuthResponse>('/login', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      return {
        success: false,
        message: errorData.message || 'Email o contraseña incorrectos.',
      };
    }
    return {
      success: false,
      message: 'Error de conexión. Inténtalo de nuevo.',
    };
  }
};

/**
 * Cierra la sesión del usuario (Opcional pero recomendado).
 * Necesita que el token sea enviado en los headers, lo cual `conexion.ts` debería hacer.
 */
export const logout = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await api.post('/logout');
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return { success: false, message: 'No se pudo cerrar la sesión.' };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};
