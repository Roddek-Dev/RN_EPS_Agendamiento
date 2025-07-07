import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  AppState,
  type AppStateStatus,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegúrate de que los nombres de importación coincidan con tus archivos
import AuthNavigation from './AuthNavigation';
import NavigationMain from './NavigationMain';
import { colors } from '../../utils/globalStyles'; // Asumo que tienes tus colores globales aquí

export const AppNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  // ✅ useCallback para evitar que esta función se recree innecesariamente.
  const loadToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error('Error al cargar el token:', error);
      setUserToken(null); // Asegura que el token sea nulo en caso de error
    } finally {
      // Solo se actualiza si aún está cargando para evitar cambios de estado innecesarios
      if (isLoading) {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  // ✅ Un solo useEffect para manejar la carga inicial y los cambios de estado de la app.
  useEffect(() => {
    // Carga inicial del token al montar el componente.
    loadToken();

    // Listener para cuando la app vuelve del segundo plano.
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App activa, verificando token...');
        loadToken();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // Función de limpieza para remover el listener cuando el componente se desmonte.
    return () => {
      subscription.remove();
    };
  }, [loadToken]);

  // Mientras se verifica el token, muestra un indicador de carga.
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Renderiza la navegación correspondiente según si existe un token de usuario.
  return (
    <NavigationContainer>
      {userToken ? <NavigationMain /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background, // Usa colores de tu paleta global
  },
});

export default AppNavigation;
