import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native'; // Importa este tipo

// --- PARÁMETROS PARA CADA STACK INDIVIDUAL ---
// Mantenemos estos para organizar y para poder usarlos en CrudsStackParamList si es necesario

export type PatientStackParamList = {
  PatientList: undefined;
  PatientDetail: { id: number };
  PatientCreate: undefined;
  PatientEdit: { id: number };
};

export type DoctorStackParamList = {
  DoctorList: undefined;
  DoctorDetail: { id: number };
  DoctorCreate: undefined;
  DoctorEdit: { id: number };
};

export type ServiceStackParamList = {
  ServiceList: undefined;
  ServiceDetail: { id: number };
  ServiceCreate: undefined;
  ServiceEdit: { id: number };
};

export type SpecialtyStackParamList = {
  SpecialtyList: undefined;
  SpecialtyDetail: { id: number };
  SpecialtyCreate: undefined;
  SpecialtyEdit: { id: number };
};

export type AppointmentStackParamList = {
  AppointmentList: undefined;
  AppointmentDetail: { id: number };
  AppointmentCreate: undefined;
  AppointmentEdit: { id: number };
};

// --- EL STACK PRINCIPAL QUE UNE TODO ---
// Esta es la parte más importante. Une todas las rutas de la app.

export type CrudsStackParamList = {
  // Pantalla principal que muestra la lista de CRUDS
  CrudsHome: undefined;

  // Cada CRUD es ahora un navegador anidado
  // NavigatorScreenParams se asegura de que los tipos se pasen correctamente
  patients: NavigatorScreenParams<PatientStackParamList>;
  doctors: NavigatorScreenParams<DoctorStackParamList>;
  services: NavigatorScreenParams<ServiceStackParamList>;
  specialties: NavigatorScreenParams<SpecialtyStackParamList>;
  appointments: NavigatorScreenParams<AppointmentStackParamList>;
};

// --- TIPO DE NAVEGACIÓN GLOBAL ---
// Este es el único tipo de navegación que necesitarás usar en tus pantallas.

export type AppNavigationProp = NativeStackNavigationProp<
  // Combina todos los tipos en uno solo
  PatientStackParamList &
    DoctorStackParamList &
    ServiceStackParamList &
    SpecialtyStackParamList &
    AppointmentStackParamList &
    CrudsStackParamList
>;
