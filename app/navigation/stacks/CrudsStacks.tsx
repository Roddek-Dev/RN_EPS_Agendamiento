import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CrudsHomeScreen from "../../screens/index";
import AppointmentStack from "./AppointmentStack";
import SpecialtieStack from "./SpecialtieStack";
import ServiceStack from "./ServiceStack";
import PatientStack from "./PatientStack";
import DoctorStack from "./DoctorStack";

const Stack = createNativeStackNavigator();

export default function CrudsStacks() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="index" 
        component={CrudsHomeScreen}
        options={{ 
          title: 'Gestión de Datos',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen 
        name="specialties" 
        component={SpecialtieStack}
        options={{ 
          title: 'Especialidades',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="services" 
        component={ServiceStack}
        options={{ 
          title: 'Servicios',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="patients" 
        component={PatientStack}
        options={{ 
          title: 'Pacientes',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="doctors" 
        component={DoctorStack}
        options={{ 
          title: 'Doctores',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="appointments" 
        component={AppointmentStack}
        options={{ 
          title: 'Citas',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  );
}