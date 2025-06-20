import api from './api';
import { User } from '@/types';

// Simulación de servicio de autenticación
export const loginService = async (email: string, password: string): Promise<User> => {
  try {
    // En producción usarías:
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Simulación
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          name: 'Dr. Ana García',
          email: 'ana.garcia@eps.com',
          role: 'doctor',
          avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
          token: 'fake-jwt-token'
        });
      }, 1000);
    });
  } catch (error) {
    throw new Error('Credenciales inválidas');
  }
};

export const logoutService = async (): Promise<void> => {
  // Lógica de logout
  return api.post('/auth/logout');
};