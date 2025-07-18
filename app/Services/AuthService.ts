import api from './conexion';
import { isAxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- INTERFACES (se mantienen igual) ---
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
  role: 'admin' | 'user'; // ✅ AÑADIDO: El rol es ahora parte de los datos de registro
}

export interface LoginData {
  email: string;
  password: string;
}

interface ValidationError {
  message: string;
  errors: { [key: string]: string[] };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// --- FUNCIONES DEL SERVICIO ---

export const register = async (
  data: RegisterData
): Promise<
  { success: true; data: AuthResponse } | { success: false; message: string }
> => {
  try {
    const response = await api.post<AuthResponse>('/register', data);
    if (response.data && response.data.token && response.data.user) {
      return { success: true, data: response.data };
    }
    return { success: false, message: 'Respuesta inválida desde el servidor.' };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data as ValidationError;
      if (errorData.errors) {
        return {
          success: false,
          message: Object.values(errorData.errors)[0][0],
        };
      }
      return {
        success: false,
        message: errorData.message || 'Error al registrar.',
      };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};

export const login = async (
  data: LoginData
): Promise<
  { success: true; data: AuthResponse } | { success: false; message: string }
> => {
  try {
    const response = await api.post<AuthResponse>('/login', data);
    if (response.data && response.data.token && response.data.user) {
      // ¡CAMBIO CLAVE! Guardamos el token directamente aquí
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      return { success: true, data: response.data };
    }
    return { success: false, message: 'Respuesta del servidor incompleta.' };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      return {
        success: false,
        message: errorData.message || 'Email o contraseña incorrectos.',
      };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};

export const logout = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    // Aunque la llamada a la API falle, limpiamos el token localmente
    await api.post('/logout').catch(console.error);

    // ¡CAMBIO CLAVE! Limpiamos el token del storage
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'No se pudo cerrar la sesión.' };
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener el usuario del storage:', error);
    return null;
  }
};

export interface ChangePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export const changePassword = async (
  data: ChangePasswordData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/change-password', data);
    return { success: true, message: response.data.message || 'Contraseña actualizada con éxito.' };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data as ValidationError;
      if (errorData.errors) {
        return {
          success: false,
          message: Object.values(errorData.errors)[0][0],
        };
      }
      return {
        success: false,
        message: errorData.message || 'Error al cambiar la contraseña.',
      };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};

export interface UpdateProfileData {
  name: string;
  email: string;
}

export const updateProfile = async (
  data: UpdateProfileData
): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const response = await api.put<{ user: User; message: string }>('/profile', data);
    const { user, message } = response.data;

    // Actualizar el usuario en AsyncStorage
    const storedUser = await getStoredUser();
    if (storedUser) {
      const updatedUser = { ...storedUser, ...user };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }

    return { success: true, message: message || 'Perfil actualizado con éxito.', user };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data as ValidationError;
      if (errorData.errors) {
        return {
          success: false,
          message: Object.values(errorData.errors)[0][0],
        };
      }
      return {
        success: false,
        message: errorData.message || 'Error al actualizar el perfil.',
      };
    }
    return { success: false, message: 'Error de conexión.' };
  }
};