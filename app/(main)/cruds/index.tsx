import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Stethoscope,
  Heart,
  Users,
  UserCheck,
  Calendar,
  ChevronRight,
} from 'lucide-react-native';
import { globalStyles, colors, typography } from '../../../utils/globalStyles';

export default function CrudsHomeScreen() {
  const modules = [
    {
      id: 'specialties',
      title: 'Especialidades',
      description: 'Gestionar especialidades médicas',
      icon: Stethoscope,
      color: '#2563eb',
      count: 12,
    },
    {
      id: 'services',
      title: 'Servicios',
      description: 'Administrar servicios disponibles',
      icon: Heart,
      color: '#dc2626',
      count: 25,
    },
    {
      id: 'patients',
      title: 'Pacientes',
      description: 'Registro de pacientes',
      icon: Users,
      color: '#16a34a',
      count: 156,
    },
    {
      id: 'doctors',
      title: 'Doctores',
      description: 'Directorio médico',
      icon: UserCheck,
      color: '#ca8a04',
      count: 8,
    },
    {
      id: 'appointments',
      title: 'Citas',
      description: 'Historial de citas médicas',
      icon: Calendar,
      color: '#7c3aed',
      count: 342,
    },
  ];

  const navigateToModule = (moduleId: string) => {
    router.push(`/(main)/cruds/${moduleId}` as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={[globalStyles.content, styles.content]}
      >
        <View style={styles.header}>
          <Text style={globalStyles.title}>Gestión de Datos</Text>
          <Text style={globalStyles.subtitle}>
            Administra la información del sistema
          </Text>
        </View>

        <View style={styles.modulesList}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[globalStyles.card, styles.moduleCard]}
              onPress={() => navigateToModule(module.id)}
            >
              <View style={styles.moduleHeader}>
                <View
                  style={[styles.moduleIcon, { backgroundColor: module.color }]}
                >
                  <module.icon color="#ffffff" size={24} />
                </View>
                <View style={styles.moduleInfo}>
                  <Text style={globalStyles.itemTitle}>{module.title}</Text>
                  <Text style={globalStyles.caption}>{module.description}</Text>
                </View>
                <View style={styles.moduleActions}>
                  <View style={[globalStyles.statusBadge, styles.countBadge]}>
                    <Text style={globalStyles.statusText}>{module.count}</Text>
                  </View>
                  <ChevronRight color={colors.text.secondary} size={20} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[globalStyles.card, styles.statsSection]}>
          <Text style={globalStyles.sectionTitle}>Estadísticas Generales</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={globalStyles.statNumber}>543</Text>
              <Text style={globalStyles.statLabel}>Total Registros</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={globalStyles.statNumber}>24</Text>
              <Text style={globalStyles.statLabel}>Activos Hoy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={globalStyles.statNumber}>98%</Text>
              <Text style={globalStyles.statLabel}>Disponibilidad</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  modulesList: {
    gap: 16,
    marginBottom: 32,
  },
  moduleCard: {
    // backgroundColor, borderRadius, padding, sombra ya están en globalStyles.card
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countBadge: {
    // backgroundColor, padding, borderRadius ya están en globalStyles.statusBadge
  },
  statsSection: {
    // backgroundColor, borderRadius, padding, sombra ya están en globalStyles.card
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
});
