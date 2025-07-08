import dayjs from 'dayjs';

// Formatear fecha para mostrar en UI
export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('DD/MM/YYYY - HH:mm:ss');
};

// Validar si un email es válido
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Capitalizar texto
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
