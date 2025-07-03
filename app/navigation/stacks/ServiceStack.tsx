import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesScreen from "../../screens/services/List";
import DetailScreen from "../../screens/services/Detail";
import CreateScreen from "../../screens/services/Create";
import EditScreen from "../../screens/services/Edit";

const Stack = createNativeStackNavigator();

export default function ServicesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#dc2626' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        component={ServicesScreen}
        options={{ title: 'Servicios' }}
      />
      <Stack.Screen
        name="detail"
        component={DetailScreen}
        options={{ title: 'Detalle de Servicio' }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ title: 'Crear Servicio' }}
      />
      <Stack.Screen
        name="edit"
        component={EditScreen}
        options={{ title: 'Editar Servicio' }}
      />
    </Stack.Navigator>
  );
}