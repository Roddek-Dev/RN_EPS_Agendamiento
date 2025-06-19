import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Clock, User, UserCheck, Calendar } from 'lucide-react-native';

export default function AppointmentsListScreen() {
  const appointments = [
    { 
      id: 1, 
      patient: 'María González',
      doctor: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 30,
      status: 'confirmed',
      type: 'Consulta General'
    },
    { 
      id: 2, 
      patient: 'Carlos Rodríguez',
      doctor: 'Dra. Ana López',
      specialty: 'Dermatología',
      date: '2024-01-15',
      time: '11:30 AM',
      duration: 45,
      status: 'pending',
      type: 'Revisión'
    },
    { 
      id: 3, 
      patient: 'Ana Martínez',
      doctor: 'Dr. Luis García',
      specialty: 'Neurología',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: 60,
      status: 'confirmed',
      type: 'Consulta Especializada'
    },
    { 
      id: 4, 
      patient: 'Luis Herrera',
      doctor: 'Dra. Carmen Silva',
      specialty: 'Pediatría',
      date: '2024-01-16',
      time: '9:00 AM',
      duration: 30,
      status: 'cancelled',
      type: 'Control'
    },
  ];

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
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar citas..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentInfo}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.dateTimeContainer}>
                    <Calendar color="#2563eb" size={16} />
                    <Text style={styles.appointmentDate}>{appointment.date}</Text>
                    <Clock color="#64748b" size={16} />
                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  </View>
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
                
                <Text style={styles.appointmentType}>{appointment.type}</Text>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
                
                <View style={styles.participantsContainer}>
                  <View style={styles.participantInfo}>
                    <User color="#64748b" size={14} />
                    <Text style={styles.participantText}>Paciente: {appointment.patient}</Text>
                  </View>
                  <View style={styles.participantInfo}>
                    <UserCheck color="#64748b" size={14} />
                    <Text style={styles.participantText}>Doctor: {appointment.doctor}</Text>
                  </View>
                </View>
                
                <Text style={styles.duration}>Duración: {appointment.duration} minutos</Text>
              </View>
              
              <View style={styles.appointmentActions}>
                <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
                  <Eye color="#2563eb" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                  <Edit color="#16a34a" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  appointmentsList: {
    gap: 12,
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 12,
  },
  participantsContainer: {
    gap: 6,
    marginBottom: 8,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantText: {
    fontSize: 14,
    color: '#64748b',
  },
  duration: {
    fontSize: 12,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#eff6ff',
  },
  editButton: {
    backgroundColor: '#f0fdf4',
  },
});