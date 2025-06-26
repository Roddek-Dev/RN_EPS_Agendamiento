import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, UserCheck, Calendar, Clock, ClipboardList, Edit } from 'lucide-react-native';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const appointment = {
    id: Number(id),
    patient: 'María González',
    doctor: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: 30,
    type: 'Consulta General',
    status: 'confirmed',
    reason: 'Dolor en el pecho y mareos ocasionales',
    notes: 'Paciente con antecedentes de hipertensión. Tomar presión arterial.',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
  };

  const editAppointment = () => {
    router.push(`/(main)/cruds/appointments/edit/${id}` as any);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#dcfce7';
      case 'pending':
        return '#fef3c7';
      case 'cancelled':
        return '#fee2e2';
      case 'completed':
        return '#e0e7ff';
      default:
        return '#f1f5f9';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#166534';
      case 'pending':
        return '#92400e';
      case 'cancelled':
        return '#991b1b';
      case 'completed':
        return '#3730a3';
      default:
        return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return 'Desconocido';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Cita #{appointment.id}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(appointment.status) }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusTextColor(appointment.status) }
              ]}>
                {getStatusText(appointment.status)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={editAppointment}>
            <Edit color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeSection}>
          <View style={styles.dateTimeCard}>
            <View style={styles.dateTimeItem}>
              <Calendar color="#7c3aed" size={24} />
              <Text style={styles.dateTimeText}>{appointment.date}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <Clock color="#7c3aed" size={24} />
              <Text style={styles.dateTimeText}>{appointment.time}</Text>
            </View>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{appointment.duration} min</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la Cita</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <ClipboardList color="#7c3aed" size={20} />
              <Text style={styles.infoText}>{appointment.type}</Text>
            </View>
            <Text style={styles.specialtyText}>{appointment.specialty}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participantes</Text>
          <View style={styles.participantsCard}>
            <View style={styles.participantItem}>
              <User color="#7c3aed" size={20} />
              <View>
                <Text style={styles.participantLabel}>Paciente</Text>
                <Text style={styles.participantName}>{appointment.patient}</Text>
              </View>
            </View>
            <View style={styles.participantItem}>
              <UserCheck color="#7c3aed" size={20} />
              <View>
                <Text style={styles.participantLabel}>Doctor</Text>
                <Text style={styles.participantName}>{appointment.doctor}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motivo de la Consulta</Text>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>{appointment.reason}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas Adicionales</Text>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.metadataCard}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={styles.metadataValue}>{appointment.createdAt}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Última Actualización:</Text>
              <Text style={styles.metadataValue}>{appointment.updatedAt}</Text>
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
    backgroundColor: '#7c3aed',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  dateTimeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateTimeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  durationBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#1e293b',
  },
  specialtyText: {
    fontSize: 14,
    color: '#7c3aed',
    fontWeight: '500',
  },
  participantsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  participantLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  participantName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  reasonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reasonText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 24,
  },
  notesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notesText: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
    lineHeight: 24,
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