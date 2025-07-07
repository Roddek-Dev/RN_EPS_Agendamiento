import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, StyleSheet, AppState, type AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./NavigationMain";

const AppNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Especificamos que userToken puede ser una cadena de texto o nulo
  const [userToken, setUserToken] = useState<string | null>(null);
  // Usamos el tipo AppStateStatus para el ref del estado de la app
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (error) {
      console.error("Error al cargar el token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    // El parámetro nextAppState ahora tiene el tipo AppStateStatus
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log('App ha vuelto a estar activa, verificando token...');
        loadToken();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (AppState.currentState === "active") {
          loadToken();
        }
      }, 2000); // Se verifica cada 2 segundos

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigation;