import { Tabs } from 'expo-router';
import { LogIn, UserPlus } from 'lucide-react-native';

export default function AuthTabLayout() {
  return (
    <Tabs
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
      <Tabs.Screen
        name="login"
        options={{
          title: 'Iniciar Sesión',
          tabBarIcon: ({ color, size }) => (
            <LogIn color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Registrarse',
          tabBarIcon: ({ color, size }) => (
            <UserPlus color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}