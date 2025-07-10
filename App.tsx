import React from 'react';
import AppNavigation from './app/navigation/AppNavigation'; // La navegación principal
import { AuthProvider } from './app/context/AuthContext'; // Importamos el proveedor

export default function App() {
  return (
    // AuthProvider envuelve a AppNavigation, dándole acceso al contexto
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
