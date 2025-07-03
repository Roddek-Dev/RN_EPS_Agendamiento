import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpecialtiesScreen from '../../screens/specialties/List';
import DetailScreen from '../../screens/specialties/Detail';
import CreateScreen from '../../screens/specialties/Create';
import EditScreen from '../../screens/specialties/Edit';

const Stack = createNativeStackNavigator();

export default function SpecialtiesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SpecialtieList" component={SpecialtiesScreen} />
      <Stack.Screen name="SpecialtieDetail" component={DetailScreen} />
      <Stack.Screen name="SpecialtieCreate" component={CreateScreen} />
      <Stack.Screen name="SpecialtieEdit" component={EditScreen} />
    </Stack.Navigator>
  );
}