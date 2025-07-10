import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---

export interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  created_at?: string;
  updated_at?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Obtiene una lista de todos los servicios.
 */
export const getServices = async (): Promise<
  { success: true; data: Service[] } | ErrorResponse
> => {
  try {
    const response = await api.get<Service[]>('/services');
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al obtener los servicios:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'Error al cargar los servicios.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener servicios.',
    };
  }
};

/**
 * Obtiene un servicio por su ID.
 */
export const getServiceById = async (
  id: number
): Promise<{ success: true; data: Service } | ErrorResponse> => {
  try {
    const response = await api.get<Service>(`/services/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(`Error al obtener el servicio ${id}:`, error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se encontró el servicio.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener el servicio.',
    };
  }
};

/**
 * Elimina un servicio por su ID.
 */
export const deleteService = async (
  id: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.delete(`/services/${id}`);
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al eliminar el servicio:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo eliminar el servicio.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al eliminar.' };
  }
};

/**
 * Crea un nuevo servicio.
 */
export const createService = async (
  data: Omit<Service, 'id'>
): Promise<{ success: true; data: Service } | ErrorResponse> => {
  try {
    const response = await api.post<Service>('/services', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al crear el servicio:', error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se pudo crear el servicio.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al crear.' };
  }
};

/**
 * Edita un servicio existente.
 */
export const updateService = async (
  id: number,
  data: Partial<Omit<Service, 'id'>>
): Promise<{ success: true; data: Service } | ErrorResponse> => {
  try {
    const response = await api.put<Service>(`/services/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al editar el servicio:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo actualizar el servicio.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al editar.' };
  }
};
