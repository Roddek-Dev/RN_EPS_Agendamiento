import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentsScreen from "../../screens/appointments/List";
import DetailScreen from "../../screens/appointments/Detail";
import CreateScreen from "../../screens/appointments/Create";
import EditScreen from "../../screens/appointments/Edit";

const Stack = createNativeStackNavigator();
export default function AppointmentsLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#7c3aed' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        component={AppointmentsScreen}
        options={{ title: 'Citas' }}
      />
      <Stack.Screen
        name="[id]"
        component={DetailScreen}
        options={{ title: 'Detalle de Cita' }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ title: 'Crear Cita' }}
      />
      <Stack.Screen
        name="edit/[id]"
        component={EditScreen}
        options={{ title: 'Editar Cita' }}
      />
    </Stack.Navigator>
  );
}
