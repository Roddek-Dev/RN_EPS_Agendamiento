import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorsScreen from '../../screens/doctors/List';
import DetailScreen from '../../screens/doctors/Detail';
import CreateScreen from '../../screens/doctors/Create';
import EditScreen from '../../screens/doctors/Edit';

const Stack = createNativeStackNavigator();

export default function DoctorsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DoctorList" component={DoctorsScreen} />
      <Stack.Screen name="DoctorDetail" component={DetailScreen} />
      <Stack.Screen name="DoctorCreate" component={CreateScreen} />
      <Stack.Screen name="DoctorEdit" component={EditScreen} />
    </Stack.Navigator>
  );
}