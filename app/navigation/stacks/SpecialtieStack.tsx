import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpecialtiesScreen from "../../screens/specialties/List";
import DetailScreen from "../../screens/specialties/Detail";
import CreateScreen from "../../screens/specialties/Create";
import EditScreen from "../../screens/specialties/Edit";

const Stack = createNativeStackNavigator();

export default function SpecialtiesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        component={SpecialtiesScreen}
        options={{ title: 'Especialidades' }}
      />
      <Stack.Screen
        name="detail"
        component={DetailScreen}
        options={{ title: 'Detalle de Especialidad' }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ title: 'Crear Especialidad' }}
      />
      <Stack.Screen
        name="edit"
        component={EditScreen}
        options={{ title: 'Editar Especialidad' }}
      />
    </Stack.Navigator>
  );
}