import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientsScreen from '../../screens/patients/List';
import DetailScreen from '../../screens/patients/Detail';
import CreateScreen from '../../screens/patients/Create';
import EditScreen from '../../screens/patients/Edit';

const Stack = createNativeStackNavigator();

export default function PatientsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Opcional: puedes ocultar la cabecera aquí si la manejas en cada pantalla
      }}
    >
      <Stack.Screen name="PatientList" component={PatientsScreen} />
      <Stack.Screen name="PatientDetail" component={DetailScreen} />
      <Stack.Screen name="PatientCreate" component={CreateScreen} />
      <Stack.Screen name="PatientEdit" component={EditScreen} />
    </Stack.Navigator>
  );
}
