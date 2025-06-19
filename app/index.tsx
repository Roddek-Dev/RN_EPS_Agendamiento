import { Redirect } from 'expo-router';
import { useState } from 'react';

export default function AppNavigation() {
  // Cambia el valor inicial según lo que quieras probar
  const [isAuthenticated] = useState(true);

  // Para debug, muestra el valor en consola
  console.log("isAuthenticated (runtime):", isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(main)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}