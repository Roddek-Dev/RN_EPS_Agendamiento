// roddek-dev/rn_eps_agendamiento/RN_EPS_Agendamiento-542ea4286365b4be397a8c1a9bcf382c3fe4a78d/App.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet, AppState, type AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigation from './app/navigation/AuthNavigation';
import NavigationMain from './app/navigation/NavigationMain';
import { colors } from './utils/globalStyles';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const appState = useRef(AppState.currentState);

  const checkToken = useCallback(async () => {
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
  }, [isLoading]);

  useEffect(() => {
    // Listener para verificar el token cuando la app vuelve a estar activa
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App ha vuelto a estar activa, verificando token...');
        checkToken();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Verificación inicial del token
    checkToken();

    return () => {
      subscription.remove();
    };
  }, [checkToken]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? (
        <NavigationMain />
      ) : (
        <AuthNavigation onLoginSuccess={checkToken} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background, // Usando tu color de fondo global
  },
});