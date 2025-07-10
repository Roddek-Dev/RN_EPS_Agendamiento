import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---

export interface Doctor {
  id: number;
  name: string;
  specialty_id: number | null;
  // Puedes añadir más campos si tu API los devuelve en la lista
  // por ejemplo: email, phone, etc.
}

interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Obtiene una lista de todos los doctores.
 */
export const getDoctors = async (): Promise<
  { success: true; data: Doctor[] } | ErrorResponse
> => {
  try {
    const response = await api.get<Doctor[]>('/doctors');
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al obtener los doctores:', error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'Error al cargar los doctores.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener doctores.',
    };
  }
};

/**
 * Obtiene un doctor por su ID.
 */
export const getDoctorById = async (
  id: number
): Promise<{ success: true; data: Doctor } | ErrorResponse> => {
  try {
    const response = await api.get<Doctor>(`/doctors/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(`Error al obtener el doctor ${id}:`, error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se encontró el doctor.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener el doctor.',
    };
  }
};

/**
 * Elimina un doctor por su ID.
 */
export const deleteDoctor = async (
  id: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.delete(`/doctors/${id}`);
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al eliminar el doctor:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo eliminar el doctor.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al eliminar.' };
  }
};

/**
 * Crea un nuevo doctor.
 */
export const createDoctor = async (
  data: Omit<Doctor, 'id'>
): Promise<{ success: true; data: Doctor } | ErrorResponse> => {
  try {
    const response = await api.post<Doctor>('/doctors', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al crear el doctor:', error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se pudo crear el doctor.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al crear.' };
  }
};

/**
 * Edita un doctor existente.
 */
export const updateDoctor = async (
  id: number,
  data: Partial<Omit<Doctor, 'id'>>
): Promise<{ success: true; data: Doctor } | ErrorResponse> => {
  try {
    const response = await api.put<Doctor>(`/doctors/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al editar el doctor:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo actualizar el doctor.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al editar.' };
  }
};
