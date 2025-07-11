import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogIn, UserPlus } from 'lucide-react-native';
import LoginScreen from "../screens/auth/login";
import RegisterScreen from "../screens/auth/register";
import { colors } from '@/utils/globalStyles';

const Tab = createBottomTabNavigator();

export default function AuthNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta el header superior de todas las pestañas
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Iniciar Sesión',
          tabBarIcon: ({ color, size }) => <LogIn color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="register"
        component={RegisterScreen}
        options={{
          title: 'Registrarse',
          tabBarIcon: ({ color, size }) => <UserPlus color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}