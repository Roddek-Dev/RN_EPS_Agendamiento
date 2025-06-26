export const COLORS = {
    primary: '#2563eb',
    secondary: '#16a34a',
    danger: '#dc2626',
    warning: '#ca8a04',
    background: '#f8fafc',
    text: '#1e293b',
    muted: '#64748b',
    border: '#e2e8f0',
  };
  
  export const ROLES = {
    admin: 'admin',
    doctor: 'doctor',
    receptionist: 'receptionist',
  };
  
  export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  export const DATE_FORMAT = 'DD/MM/YYYY';
  export const TIME_FORMAT = 'HH:mm';