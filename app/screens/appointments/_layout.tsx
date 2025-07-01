import { Stack } from 'expo-router';

export default function AppointmentsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Citas',
          headerStyle: { backgroundColor: '#7c3aed' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Detalle de Cita',
          headerStyle: { backgroundColor: '#7c3aed' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ 
          title: 'Editar Cita',
          headerStyle: { backgroundColor: '#7c3aed' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}
