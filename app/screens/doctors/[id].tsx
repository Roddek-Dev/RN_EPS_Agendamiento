import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Briefcase, Star, Phone, Mail, Calendar, Edit } from 'lucide-react-native';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const doctor = {
    id: Number(id),
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    experience: '10 años',
    email: 'juan.perez@clinica.com',
    phone: '+57 310 123 4567',
    rating: 4.8,
    appointments: 156,
    status: 'available',
    createdAt: '2020-05-10',
    updatedAt: '2023-12-15',
    schedule: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    education: 'Universidad Nacional de Colombia, Especialización en Cardiología',
  };

  const editDoctor = () => {
    router.push(`/(main)/cruds/doctors/edit/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{doctor.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: doctor.status === 'available' ? '#dcfce7' : '#fef3c7' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: doctor.status === 'available' ? '#166534' : '#92400e' }
              ]}>
                {doctor.status === 'available' ? 'Disponible' : 'Ocupado'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={editDoctor}>
            <Edit color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
            style={styles.avatar}
          />
          <View style={styles.doctorStats}>
            <View style={styles.statItem}>
              <Star color="#fbbf24" size={24} fill="#fbbf24" />
              <Text style={styles.statNumber}>{doctor.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar color="#ca8a04" size={24} />
              <Text style={styles.statNumber}>{doctor.appointments}</Text>
            </View>
            <View style={styles.statItem}>
              <Briefcase color="#2563eb" size={24} />
              <Text style={styles.statNumber}>{doctor.experience}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Profesional</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Briefcase color="#ca8a04" size={20} />
              <Text style={styles.infoText}>{doctor.specialty}</Text>
            </View>
            <View style={styles.infoItem}>
              <Briefcase color="#ca8a04" size={20} />
              <Text style={styles.infoText}>{doctor.education}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar color="#ca8a04" size={20} />
              <Text style={styles.infoText}>Horario: {doctor.schedule}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Phone color="#ca8a04" size={20} />
              <Text style={styles.infoText}>{doctor.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail color="#ca8a04" size={20} />
              <Text style={styles.infoText}>{doctor.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.metadataCard}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={styles.metadataValue}>{doctor.createdAt}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Última Actualización:</Text>
              <Text style={styles.metadataValue}>{doctor.updatedAt}</Text>
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
    backgroundColor: '#ca8a04',
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
  doctorStats: {
    flex: 1,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
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
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
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