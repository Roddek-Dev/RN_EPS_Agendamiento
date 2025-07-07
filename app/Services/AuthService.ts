import api from "./conexion"; // Ajustamos la ruta de importación según la estructura de tu proyecto
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";

// --- INTERFACES PARA TIPADO ---
// Define la forma de la respuesta exitosa del login
interface LoginSuccessResponse {
  success: true;
  token: string;
}

// Define la forma de la respuesta de registro
interface RegisterSuccessResponse {
  success: true;
  data: any; // Puedes cambiar 'any' por un tipo más específico si conoces la estructura
}

// Define la forma de la respuesta de error genérica
interface ErrorResponse {
  success: false;
  message: string;
}

// --- FUNCIONES DEL SERVICIO ---

/**
 * Autentica a un usuario y guarda el token si es exitoso.
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginSuccessResponse | ErrorResponse> => {
  try {
    const response = await api.post<{ token: string }>("/login", { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem("userToken", token);
    return { success: true, token };
  } catch (error) {
    // Usamos el type guard 'isAxiosError' para un manejo de errores más seguro
    if (isAxiosError(error) && error.response) {
      console.error("Error de login:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Credenciales incorrectas.",
      };
    }
    console.error("Error de login (inesperado):", error);
    return { success: false, message: "Error al conectar con el servidor." };
  }
};

/**
 * Cierra la sesión del usuario, eliminando el token.
 */
export const logoutUser = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    // Suponiendo que el endpoint de logout existe y está protegido por token
    await api.post("/logout");
    await AsyncStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al cerrar sesión:", error.response.data);
      return { success: false, message: error.response.data.message };
    }
    // Aunque falle la llamada a la API, intentamos limpiar el token localmente
    await AsyncStorage.removeItem("userToken");
    console.error("Error al cerrar sesión (inesperado):", error);
    return { success: false, message: "No se pudo cerrar la sesión en el servidor." };
  }
};

/**
 * Registra un nuevo usuario.
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string,
): Promise<RegisterSuccessResponse | ErrorResponse> => {
  try {
    const response = await api.post("/register", { email, password, name });
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error de registro:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "No se pudo completar el registro.",
      };
    }
    console.error("Error de registro (inesperado):", error);
    return { success: false, message: "Error al conectar con el servidor." };
  }
};