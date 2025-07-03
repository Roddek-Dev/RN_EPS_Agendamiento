import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorsScreen from "../../screens/doctors/List";
import DetailScreen from "../../screens/doctors/Detail";
import CreateScreen from "../../screens/doctors/Create";
import EditScreen from "../../screens/doctors/Edit";

const Stack = createNativeStackNavigator();
export default function DoctorsLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#ca8a04' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        component={DoctorsScreen}
        options={{ title: 'Doctores' }}
      />
      <Stack.Screen
        name="[id]"
        component={DetailScreen}
        options={{ title: 'Detalle de Doctor' }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ title: 'Crear Doctor' }}
      />
      <Stack.Screen
        name="edit/[id]"
        component={EditScreen}
        options={{ title: 'Editar Doctor' }}
      />
    </Stack.Navigator>
  );
}
