import { Stack } from 'expo-router';

export default function CrudsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Gestión de Datos',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="specialties" 
        options={{ 
          title: 'Especialidades',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="services" 
        options={{ 
          title: 'Servicios',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="patients" 
        options={{ 
          title: 'Pacientes',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="doctors" 
        options={{ 
          title: 'Doctores',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="appointments" 
        options={{ 
          title: 'Citas',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}
