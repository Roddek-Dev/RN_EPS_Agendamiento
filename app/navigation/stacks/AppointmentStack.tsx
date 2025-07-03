import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsScreen from '../../screens/appointments/List';
import DetailScreen from '../../screens/appointments/Detail';
import CreateScreen from '../../screens/appointments/Create';
import EditScreen from '../../screens/appointments/Edit';

const Stack = createNativeStackNavigator();

export default function AppointmentsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppointmentList" component={AppointmentsScreen} />
      <Stack.Screen name="AppointmentDetail" component={DetailScreen} />
      <Stack.Screen name="AppointmentCreate" component={CreateScreen} />
      <Stack.Screen name="AppointmentEdit" component={EditScreen} />
    </Stack.Navigator>
  );
}