import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Users, UserCheck, Clock, Bell } from 'lucide-react-native';
import { MOCK_USER } from '../../constants/auth';
import { globalStyles, colors } from '../../utils/globalStyles';

export default function HomeScreen() {
  const quickActions = [
    { id: 1, title: 'Nueva Cita', icon: Calendar, color: colors.primary },
    { id: 2, title: 'Pacientes', icon: Users, color: colors.secondary },
    { id: 3, title: 'Doctores', icon: UserCheck, color: colors.accent },
    { id: 4, title: 'Historial', icon: Clock, color: colors.warning },
  ];

  const recentActivity = [
    {
      id: 1,
      patient: 'María González',
      time: '10:00 AM',
      type: 'Consulta General',
    },
    {
      id: 2,
      patient: 'Carlos Rodríguez',
      time: '11:30 AM',
      type: 'Cardiología',
    },
    { id: 3, patient: 'Ana Martínez', time: '2:00 PM', type: 'Dermatología' },
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: MOCK_USER.avatar }}
              style={globalStyles.avatar}
            />
            <View>
              <Text style={globalStyles.title}>¡Hola, {MOCK_USER.name}!</Text>
              <Text style={globalStyles.subtitle}>Bienvenido a EPS Salud</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell color={colors.text.secondary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>24</Text>
            <Text style={globalStyles.caption}>Citas Hoy</Text>
          </View>
          <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>156</Text>
            <Text style={globalStyles.caption}>Pacientes</Text>
          </View>
          <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>8</Text>
            <Text style={globalStyles.caption}>Doctores</Text>
          </View>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Acciones Rápidas</Text>
          <View style={globalStyles.row}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  globalStyles.quickActionCard,
                  { backgroundColor: action.color },
                ]}
              >
                <View style={globalStyles.quickActionIcon}>
                  <action.icon color="#ffffff" size={24} />
                </View>
                <Text style={globalStyles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Próximas Citas</Text>
          <View style={globalStyles.appointmentsList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={globalStyles.appointmentCard}>
                <View style={globalStyles.row}>
                  <Text style={globalStyles.patientName}>
                    {activity.patient}
                  </Text>
                  <Text style={globalStyles.caption}>{activity.type}</Text>
                </View>
                <Text style={globalStyles.caption}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
});
