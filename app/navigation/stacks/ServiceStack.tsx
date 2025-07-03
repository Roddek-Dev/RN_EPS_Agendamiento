import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../../screens/services/List';
import DetailScreen from '../../screens/services/Detail';
import CreateScreen from '../../screens/services/Create';
import EditScreen from '../../screens/services/Edit';

const Stack = createNativeStackNavigator();

export default function ServicesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ServiceList" component={ServicesScreen} />
      <Stack.Screen name="ServiceDetail" component={DetailScreen} />
      <Stack.Screen name="ServiceCreate" component={CreateScreen} />
      <Stack.Screen name="ServiceEdit" component={EditScreen} />
    </Stack.Navigator>
  );
}