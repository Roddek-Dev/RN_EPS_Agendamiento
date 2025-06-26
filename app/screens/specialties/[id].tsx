import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, Users, Activity, Calendar } from 'lucide-react-native';

export default function SpecialtyDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const specialty = {
    id: Number(id),
    name: 'Cardiología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    doctors: [
      { id: 1, name: 'Dr. Juan Pérez', experience: '10 años' },
      { id: 2, name: 'Dra. María González', experience: '8 años' },
      { id: 3, name: 'Dr. Carlos López', experience: '12 años' },
    ],
    services: [
      'Electrocardiograma',
      'Ecocardiograma',
      'Prueba de esfuerzo',
      'Holter',
      'Consulta cardiológica',
    ],
    appointments: {
      total: 45,
      thisMonth: 12,
      pending: 3,
    }
  };

  const editSpecialty = () => {
    router.push(`/(main)/cruds/specialties/edit/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{specialty.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: specialty.status === 'active' ? '#dcfce7' : '#fef3c7' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: specialty.status === 'active' ? '#166534' : '#92400e' }
              ]}>
                {specialty.status === 'active' ? 'Activa' : 'Inactiva'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={editSpecialty}>
            <Edit color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{specialty.description}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users color="#2563eb" size={24} />
            </View>
            <Text style={styles.statNumber}>{specialty.doctors.length}</Text>
            <Text style={styles.statLabel}>Doctores</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar color="#16a34a" size={24} />
            </View>
            <Text style={styles.statNumber}>{specialty.appointments.total}</Text>
            <Text style={styles.statLabel}>Citas Totales</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Activity color="#dc2626" size={24} />
            </View>
            <Text style={styles.statNumber}>{specialty.appointments.thisMonth}</Text>
            <Text style={styles.statLabel}>Este Mes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctores Disponibles</Text>
          <View style={styles.doctorsList}>
            {specialty.doctors.map((doctor) => (
              <View key={doctor.id} style={styles.doctorCard}>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorExperience}>{doctor.experience} de experiencia</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios Disponibles</Text>
          <View style={styles.servicesList}>
            {specialty.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.metadataCard}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={styles.metadataValue}>{specialty.createdAt}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Última Actualización:</Text>
              <Text style={styles.metadataValue}>{specialty.updatedAt}</Text>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#2563eb',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  doctorsList: {
    gap: 8,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  doctorExperience: {
    fontSize: 14,
    color: '#64748b',
  },
  servicesList: {
    gap: 8,
  },
  serviceItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceText: {
    fontSize: 16,
    color: '#1e293b',
  },
  metadataCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  metadataLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 14,
    color: '#1e293b',
  },
});