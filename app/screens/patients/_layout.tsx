import { Stack } from 'expo-router';

export default function PatientsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Pacientes',
          headerStyle: { backgroundColor: '#16a34a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Detalle de Paciente',
          headerStyle: { backgroundColor: '#16a34a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ 
          title: 'Editar Paciente',
          headerStyle: { backgroundColor: '#16a34a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
    </Stack>
  );
}
