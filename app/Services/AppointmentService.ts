import api from "./conexion";
import { isAxiosError } from "axios";

// --- INTERFACES PARA TIPADO ---

// Define la estructura de una cita (Appointment)
// Puedes ajustar estos campos según los datos que maneje tu API
export interface Appointment {
  id: number;
  appointment_time: string; // Cambiado de date
  doctor_id: number;
  patient_id: number;
  service_id: number | null;
}

// Define una forma genérica para las respuestas de error
interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Obtiene una lista de todas las citas.
 */
export const getAppointments = async (): Promise<{ success: true; data: Appointment[] } | ErrorResponse> => {
  try {
    const response = await api.get<Appointment[]>("/appointments"); // Endpoint: /appointments
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al obtener las citas:", error.response.data);
      return { success: false, message: error.response.data.message || "Error al cargar las citas." };
    }
    console.error("Error inesperado:", error);
    return { success: false, message: "Error de conexión al obtener citas." };
  }
};

export const getAppointmentById = async (
    id: number
  ): Promise<{ success: true; data: Appointment } | ErrorResponse> => {
    try {
      // Hacemos una petición GET al endpoint específico para un ID
      const response = await api.get<Appointment>(`/appointments/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error(`Error al obtener la cita ${id}:`, error.response.data);
        return { success: false, message: error.response.data.message || "No se encontró la cita." };
      }
      console.error("Error inesperado:", error);
      return { success: false, message: "Error de conexión al obtener la cita." };
    }
  };

/**
 * Elimina una cita por su ID.
 */
export const deleteAppointment = async (id: number): Promise<{ success: boolean; message?: string }> => {
  try {
    await api.delete(`/appointments/${id}`); // Endpoint: /appointments/{id}
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al eliminar la cita:", error.response.data);
      return { success: false, message: error.response.data.message || "No se pudo eliminar la cita." };
    }
    console.error("Error inesperado:", error);
    return { success: false, message: "Error de conexión al eliminar." };
  }
};

/**
 * Crea una nueva cita.
 * Omitimos 'id' del tipo de datos de entrada, ya que generalmente lo genera el servidor.
 */
export const createAppointment = async (
  data: Omit<Appointment, 'id'>
): Promise<{ success: true; data: Appointment } | ErrorResponse> => {
  try {
    const response = await api.post<Appointment>("/appointments", data); // Endpoint: /appointments
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al crear la cita:", error.response.data);
      return { success: false, message: error.response.data.message || "No se pudo crear la cita." };
    }
    console.error("Error inesperado:", error);
    return { success: false, message: "Error de conexión al crear." };
  }
};

/**
 * Edita una cita existente.
 * Los datos de entrada pueden ser parciales, por eso usamos Partial<>.
 */
export const updateAppointment = async (
  id: number,
  data: Partial<Omit<Appointment, 'id'>>
): Promise<{ success: true; data: Appointment } | ErrorResponse> => {
  try {
    const response = await api.put<Appointment>(`/appointments/${id}`, data); // Endpoint: /appointments/{id}
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al editar la cita:", error.response.data);
      return { success: false, message: error.response.data.message || "No se pudo actualizar la cita." };
    }
    console.error("Error inesperado:", error);
    return { success: false, message: "Error de conexión al editar." };
  }
};