import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import AppNavigation from './navigation/AppNavigation';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <NavigationContainer>
      <AppNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}