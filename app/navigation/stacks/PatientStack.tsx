import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientsScreen from "../../screens/patients/List";
import DetailScreen from "../../screens/patients/Detail";
import CreateScreen from "../../screens/patients/Create";
import EditScreen from "../../screens/patients/Edit";

const Stack = createNativeStackNavigator();
export default function PatientsLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#16a34a' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        component={PatientsScreen}
        options={{ title: 'Pacientes' }}
      />
      <Stack.Screen
        name="[id]"
        component={DetailScreen}
        options={{ title: 'Detalle de Paciente' }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ title: 'Crear Paciente' }}
      />
      <Stack.Screen
        name="edit/[id]"
        component={EditScreen}
        options={{ title: 'Editar Paciente' }}
      />
    </Stack.Navigator>
  );
}
