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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        component={CrudsHomeScreen}
      />
      <Stack.Screen name="specialties" component={SpecialtieStack} />
      <Stack.Screen name="services" component={ServiceStack} />
      <Stack.Screen name="patients" component={PatientStack} />
      <Stack.Screen name="doctors" component={DoctorStack} />
      <Stack.Screen name="appointments" component={AppointmentStack} />
    </Stack.Navigator>
  );
}