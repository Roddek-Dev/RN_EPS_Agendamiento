import { Stack } from 'expo-router';

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Servicios',
          headerStyle: { backgroundColor: '#dc2626' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Detalle de Servicio',
          headerStyle: { backgroundColor: '#dc2626' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ 
          title: 'Editar Servicio',
          headerStyle: { backgroundColor: '#dc2626' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}
