import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, Mail, Calendar, Edit, Clock } from 'lucide-react-native';

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const patient = {
    id: Number(id),
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    birthDate: '1990-05-15',
    age: 33,
    bloodType: 'O+',
    status: 'active',
    createdAt: '2023-01-10',
    updatedAt: '2023-12-15',
    lastAppointment: '2023-12-10',
    totalAppointments: 12,
  };

  const editPatient = () => {
    router.push(`/(main)/cruds/patients/edit/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{patient.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: patient.status === 'active' ? '#dcfce7' : '#fef3c7' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: patient.status === 'active' ? '#166534' : '#92400e' }
              ]}>
                {patient.status === 'active' ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={editPatient}>
            <Edit color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
            style={styles.avatar}
          />
          <View style={styles.patientStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{patient.age}</Text>
              <Text style={styles.statLabel}>Años</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{patient.totalAppointments}</Text>
              <Text style={styles.statLabel}>Citas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{patient.bloodType}</Text>
              <Text style={styles.statLabel}>Tipo Sanguíneo</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Phone color="#16a34a" size={20} />
              <Text style={styles.infoText}>{patient.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail color="#16a34a" size={20} />
              <Text style={styles.infoText}>{patient.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <User color="#16a34a" size={20} />
              <Text style={styles.infoText}>{patient.address}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar color="#16a34a" size={20} />
              <Text style={styles.infoText}>Fecha de Nacimiento: {patient.birthDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial Reciente</Text>
          <View style={styles.historyCard}>
            <View style={styles.historyItem}>
              <Clock color="#16a34a" size={20} />
              <Text style={styles.historyText}>Última cita: {patient.lastAppointment}</Text>
            </View>
            <View style={styles.historyItem}>
              <Clock color="#16a34a" size={20} />
              <Text style={styles.historyText}>Total de citas: {patient.totalAppointments}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.metadataCard}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={styles.metadataValue}>{patient.createdAt}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Última Actualización:</Text>
              <Text style={styles.metadataValue}>{patient.updatedAt}</Text>
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
    backgroundColor: '#16a34a',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  patientStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyText: {
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