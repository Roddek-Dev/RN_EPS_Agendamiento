
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogIn, UserPlus } from 'lucide-react-native';

import Login from "../screens/auth/login";
import Register from "../screens/auth/register";

const Tab = createBottomTabNavigator();

export default function AuthNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="login"
        component={Login}
        options={{
          title: 'Iniciar Sesión',
          tabBarIcon: ({ color, size }) => <LogIn color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{
          title: 'Registrarse',
          tabBarIcon: ({ color, size }) => <UserPlus color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}