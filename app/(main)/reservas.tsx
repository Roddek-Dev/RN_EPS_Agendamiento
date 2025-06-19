import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, Filter, Search } from 'lucide-react-native';

export default function ReservasScreen() {
  const appointments = [
    {
      id: 1,
      patient: 'María González',
      doctor: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      patient: 'Carlos Rodríguez',
      doctor: 'Dra. Ana López',
      specialty: 'Dermatología',
      date: '2024-01-15',
      time: '11:30 AM',
      status: 'pending',
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      doctor: 'Dr. Luis García',
      specialty: 'Neurología',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'confirmed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#16a34a';
      case 'pending':
        return '#ca8a04';
      case 'cancelled':
        return '#dc2626';
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
      default:
        return 'Desconocido';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reservas de Citas</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Search color="#64748b" size={20} />
          <Text style={styles.filterText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#64748b" size={20} />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Calendar color="#64748b" size={20} />
          <Text style={styles.filterText}>Fecha</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.todaySection}>
          <Text style={styles.sectionTitle}>Hoy - 15 de Enero</Text>
          <View style={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.timeContainer}>
                    <Clock color="#64748b" size={16} />
                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.appointmentDetails}>
                  <Text style={styles.patientName}>{appointment.patient}</Text>
                  <Text style={styles.doctorName}>{appointment.doctor}</Text>
                  <Text style={styles.specialty}>{appointment.specialty}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Próximas Citas</Text>
          <View style={styles.emptyState}>
            <Calendar color="#cbd5e1" size={48} />
            <Text style={styles.emptyStateText}>No hay citas programadas</Text>
            <Text style={styles.emptyStateSubtext}>Las próximas citas aparecerán aquí</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todaySection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  appointmentsList: {
    gap: 12,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  appointmentDetails: {
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  doctorName: {
    fontSize: 14,
    color: '#64748b',
  },
  specialty: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  upcomingSection: {
    marginBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});