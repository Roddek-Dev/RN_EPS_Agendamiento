import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // 1. Importa el hook de autenticación

// Importa tus navegadores
import AuthNavigation from './AuthNavigation';
import NavigationMain from './NavigationMain';

export const AppNavigation: React.FC = () => {
  // 2. Obtiene el estado de autenticación desde el contexto
  const { authState } = useAuth();

  return (
    // 3. El NavigationContainer ahora decide qué mostrar basado en el contexto
    <NavigationContainer>
      {authState.isAuthenticated ? <NavigationMain /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
