// /screens/reservas/reservas.tsx (o la ruta correcta en tu proyecto)

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, Filter, Search } from 'lucide-react-native';
import { globalStyles, colors } from '../../utils/globalStyles';

export default function ReservasScreen() {
  const appointments = [
    {
      id: 1,
      patient: 'María González',
      doctor: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      date: '2025-06-26', // Fecha actualizada para el ejemplo
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      patient: 'Carlos Rodríguez',
      doctor: 'Dra. Ana López',
      specialty: 'Dermatología',
      date: '2025-06-26',
      time: '11:30 AM',
      status: 'pending',
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      doctor: 'Dr. Luis García',
      specialty: 'Neurología',
      date: '2025-06-26',
      time: '2:00 PM',
      status: 'confirmed',
    },
  ];

  // MEJORA: Esta función ahora usa los colores globales para mantener la consistencia
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.secondary; // Verde de éxito
      case 'pending':
        return colors.warning; // Amarillo de advertencia
      case 'cancelled':
        return colors.accent; // Rojo de acento/error
      default:
        return colors.text.muted; // Color gris por defecto
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
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.spaceBetween, styles.header]}>
        <Text style={globalStyles.title}>Reservas de Citas</Text>
        <TouchableOpacity
          style={[
            globalStyles.circularButton,
            { backgroundColor: colors.primary },
          ]}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.filtersContainer}>
        <TouchableOpacity style={globalStyles.filterButton}>
          <Search color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Buscar</Text>
        </TouchableOpacity>
        {/* AÑADIDO: Filtros que faltaban */}
        <TouchableOpacity style={globalStyles.filterButton}>
          <Filter color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.filterButton}>
          <Calendar color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Fecha</Text>
        </TouchableOpacity>
      </View>

      {/* Se utiliza un padding horizontal específico para el scroll, no el global */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Hoy - 26 de Junio</Text>

          {/* AÑADIDO: Mapeo de citas para renderizarlas en la lista */}
          <View style={globalStyles.appointmentsList}>
            {appointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={globalStyles.appointmentCard}
              >
                <View style={globalStyles.appointmentHeader}>
                  <View style={globalStyles.timeContainer}>
                    <Clock color={colors.text.secondary} size={16} />
                    <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: 'bold', marginLeft: 6 }}>
                      {appointment.time}
                    </Text>
                  </View>
                  <View
                    style={[
                      globalStyles.statusBadge,
                      { backgroundColor: getStatusColor(appointment.status) },
                    ]}
                  >
                    <Text style={globalStyles.statusText}>
                      {getStatusText(appointment.status)}
                    </Text>
                  </View>
                </View>
                <View style={globalStyles.appointmentDetails}>
                  <Text style={globalStyles.patientName}>
                    {appointment.patient}
                  </Text>
                  <Text style={globalStyles.doctorName}>
                    {appointment.doctor}
                  </Text>
                  <Text style={globalStyles.specialty}>
                    {appointment.specialty}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AÑADIDO: Sección de "Próximas Citas" con estado vacío */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Próximas Citas</Text>
          <View style={globalStyles.emptyState}>
            <Calendar color="#cbd5e1" size={48} />
            <Text style={globalStyles.emptyStateText}>
              No hay más citas programadas
            </Text>
            <Text style={globalStyles.emptyStateSubtext}>
              Las futuras citas aparecerán aquí
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4, // Reducido para acercar los filtros
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
