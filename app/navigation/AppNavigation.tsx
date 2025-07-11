import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import NavigationMain from './NavigationMain';
import { colors } from '@/utils/globalStyles';

export const AppNavigation: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para verificar el token en cualquier momento
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (e) {
      console.error('Error al leer el token', e);
      setToken(null);
    } finally {
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  // Vuelve a verificar el token cada vez que la app vuelve a primer plano
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  // Muestra un indicador de carga mientras se verifica el token inicial
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Si hay token, muestra la app principal.
        Si no, muestra la autenticación y le pasamos la función `checkToken`
        para que el login pueda "avisarle" que vuelva a verificar.
      */}
      {token ? (
        <NavigationMain />
      ) : (
        <AuthNavigation onLoginSuccess={checkToken} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
