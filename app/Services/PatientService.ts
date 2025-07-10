import api from './conexion';
import { isAxiosError } from 'axios';

// --- INTERFACES PARA TIPADO ---

export interface Patient {
  id: number;
  name: string;
  email: string | null;
  created_at?: string; // Opcional, por si lo necesitas mostrar
  updated_at?: string; // Opcional
}

interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Obtiene una lista de todos los pacientes.
 */
export const getPatients = async (): Promise<
  { success: true; data: Patient[] } | ErrorResponse
> => {
  try {
    const response = await api.get<Patient[]>('/patients');
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al obtener los pacientes:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'Error al cargar los pacientes.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener pacientes.',
    };
  }
};

/**
 * Obtiene un paciente por su ID.
 */
export const getPatientById = async (
  id: number
): Promise<{ success: true; data: Patient } | ErrorResponse> => {
  try {
    const response = await api.get<Patient>(`/patients/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(`Error al obtener el paciente ${id}:`, error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se encontró el paciente.',
      };
    }
    console.error('Error inesperado:', error);
    return {
      success: false,
      message: 'Error de conexión al obtener el paciente.',
    };
  }
};

/**
 * Elimina un paciente por su ID.
 */
export const deletePatient = async (
  id: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.delete(`/patients/${id}`);
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al eliminar el paciente:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo eliminar el paciente.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al eliminar.' };
  }
};

/**
 * Crea un nuevo paciente.
 */
export const createPatient = async (
  data: Omit<Patient, 'id'>
): Promise<{ success: true; data: Patient } | ErrorResponse> => {
  try {
    const response = await api.post<Patient>('/patients', data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al crear el paciente:', error.response.data);
      return {
        success: false,
        message: error.response.data.message || 'No se pudo crear el paciente.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al crear.' };
  }
};

/**
 * Edita un paciente existente.
 */
export const updatePatient = async (
  id: number,
  data: Partial<Omit<Patient, 'id'>>
): Promise<{ success: true; data: Patient } | ErrorResponse> => {
  try {
    const response = await api.put<Patient>(`/patients/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('Error al editar el paciente:', error.response.data);
      return {
        success: false,
        message:
          error.response.data.message || 'No se pudo actualizar el paciente.',
      };
    }
    console.error('Error inesperado:', error);
    return { success: false, message: 'Error de conexión al editar.' };
  }
};
