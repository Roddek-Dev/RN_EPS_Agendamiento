import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Stethoscope, 
  Heart, 
  Users, 
  UserCheck, 
  Calendar,
  ChevronRight 
} from 'lucide-react-native';

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Gestión de Datos</Text>
          <Text style={styles.subtitle}>Administra la información del sistema</Text>
        </View>

        <View style={styles.modulesList}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              onPress={() => navigateToModule(module.id)}
            >
              <View style={styles.moduleHeader}>
                <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
                  <module.icon color="#ffffff" size={24} />
                </View>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                </View>
                <View style={styles.moduleActions}>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{module.count}</Text>
                  </View>
                  <ChevronRight color="#64748b" size={20} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Estadísticas Generales</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>543</Text>
              <Text style={styles.statLabel}>Total Registros</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Activos Hoy</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Disponibilidad</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  modulesList: {
    gap: 16,
    marginBottom: 32,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  moduleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  statsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});