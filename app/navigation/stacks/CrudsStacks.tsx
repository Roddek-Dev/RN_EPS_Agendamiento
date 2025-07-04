import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Importa TODAS las pantallas de tus CRUDS ---

// Pantalla principal que muestra la lista de CRUDS
import CrudsHomeScreen from '../../screens/CrudsHome';

// Pantallas de Citas (Appointments)
import AppointmentListScreen from '../../screens/appointments/List';
import AppointmentDetailScreen from '../../screens/appointments/Detail';
import AppointmentCreateScreen from '../../screens/appointments/Create';
import AppointmentEditScreen from '../../screens/appointments/Edit';

// Pantallas de Doctores (Doctors)
import DoctorListScreen from '../../screens/doctors/List';
import DoctorDetailScreen from '../../screens/doctors/Detail';
import DoctorCreateScreen from '../../screens/doctors/Create';
import DoctorEditScreen from '../../screens/doctors/Edit';

// Pantallas de Pacientes (Patients)
import PatientListScreen from '../../screens/patients/List';
import PatientDetailScreen from '../../screens/patients/Detail';
import PatientCreateScreen from '../../screens/patients/Create';
import PatientEditScreen from '../../screens/patients/Edit';

// Pantallas de Servicios (Services)
import ServiceListScreen from '../../screens/services/List';
import ServiceDetailScreen from '../../screens/services/Detail';
import ServiceCreateScreen from '../../screens/services/Create';
import ServiceEditScreen from '../../screens/services/Edit';

// Pantallas de Especialidades (Specialties)
import SpecialtyListScreen from '../../screens/specialties/List';
import SpecialtyDetailScreen from '../../screens/specialties/Detail';
import SpecialtyCreateScreen from '../../screens/specialties/Create';
import SpecialtyEditScreen from '../../screens/specialties/Edit';

const Stack = createNativeStackNavigator();

export default function CrudsStacks() {
  return (
    <Stack.Navigator
      initialRouteName="CrudsHome"
      screenOptions={{
        headerShown: false, // Oculta la cabecera para todo el stack
      }}
    >
      {/* Pantalla principal que enlaza a los demás CRUDS */}
      <Stack.Screen name="CrudsHome" component={CrudsHomeScreen} />

      {/* --- Pantallas de Citas --- */}
      <Stack.Screen name="AppointmentList" component={AppointmentListScreen} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} />
      <Stack.Screen name="AppointmentCreate" component={AppointmentCreateScreen} />
      <Stack.Screen name="AppointmentEdit" component={AppointmentEditScreen} />

      {/* --- Pantallas de Doctores --- */}
      <Stack.Screen name="DoctorList" component={DoctorListScreen} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
      <Stack.Screen name="DoctorCreate" component={DoctorCreateScreen} />
      <Stack.Screen name="DoctorEdit" component={DoctorEditScreen} />

      {/* --- Pantallas de Pacientes --- */}
      <Stack.Screen name="PatientList" component={PatientListScreen} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen name="PatientCreate" component={PatientCreateScreen} />
      <Stack.Screen name="PatientEdit" component={PatientEditScreen} />

      {/* --- Pantallas de Servicios --- */}
      <Stack.Screen name="ServiceList" component={ServiceListScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="ServiceCreate" component={ServiceCreateScreen} />
      <Stack.Screen name="ServiceEdit" component={ServiceEditScreen} />

      {/* --- Pantallas de Especialidades --- */}
      <Stack.Screen name="SpecialtyList" component={SpecialtyListScreen} />
      <Stack.Screen name="SpecialtyDetail" component={SpecialtyDetailScreen} />
      <Stack.Screen name="SpecialtyCreate" component={SpecialtyCreateScreen} />
      <Stack.Screen name="SpecialtyEdit" component={SpecialtyEditScreen} />
      
    </Stack.Navigator>
  );
}