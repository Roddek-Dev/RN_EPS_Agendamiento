import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Calendar, Settings } from 'lucide-react-native';
import Inicio from "../screens/home";
import Reservas from "../screens/reservas";
import CrudsStacks from "./stacks/CrudsStacks";

const Tab = createBottomTabNavigator();
export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="home"
        component={Inicio}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="reservas"
        component={Reservas}
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="cruds"
        component={CrudsStacks}
        options={{
          title: 'Gestión',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
      </Tab.Navigator>
  );
}