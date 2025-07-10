import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---

export interface Specialty {
  id: number;
  name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Obtiene una lista de todas las especialidades.
 */
export const getSpecialties = async (): Promise<
  { success: true; data: Specialty[] } | ErrorResponse
> => {
  try {
    const response = await api.get<Specialty[]>('/specialties');
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(
        'Error al obtener las especialidades:',
        error.response.data
      );
      return {
        success: false,
        message:
          error.response.data.message || 'Error al cargar las especialidades.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener especialidades.',
    };
  }
};

/**
 * Obtiene una especialidad por su ID.
 */
export const getSpecialtyById = async (
  id: number
): Promise<{ success: true; data: Specialty } | ErrorResponse> => {
  try {
    const response = await api.get<Specialty>(`/specialties/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(
        `Error al obtener la especialidad ${id}:`,
        error.response.data
      );
      return {
        success: false,
        message:
          error.response.data.message || 'No se encontró la especialidad.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener la especialidad.',
    };
  }
};

/**
 * Elimina una especialidad por su ID.
 */
export const deleteSpecialty = async (
  id: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.delete(`/specialties/${id}`);
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al eliminar la especialidad:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo eliminar la especialidad.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al eliminar.' };
  }
};

/**
 * Crea una nueva especialidad.
 */
export const createSpecialty = async (
  data: Omit<Specialty, 'id'>
): Promise<{ success: true; data: Specialty } | ErrorResponse> => {
  try {
    const response = await api.post<Specialty>('/specialties', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al crear la especialidad:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo crear la especialidad.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al crear.' };
  }
};

/**
 * Edita una especialidad existente.
 */
export const updateSpecialty = async (
  id: number,
  data: Partial<Omit<Specialty, 'id'>>
): Promise<{ success: true; data: Specialty } | ErrorResponse> => {
  try {
    const response = await api.put<Specialty>(`/specialties/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al editar la especialidad:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message ||
          'No se pudo actualizar la especialidad.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al editar.' };
  }
};
