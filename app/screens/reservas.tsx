import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar, Clock, Plus, Filter, Search, TrendingUp } from "lucide-react-native"
import { globalStyles, colors, spacing } from "@/utils/globalStyles"
import { StatusBadge } from "@/components/StatusBadge"

export default function ReservasScreen() {
  const appointments = [
    {
      id: 1,
      patient: "María González",
      doctor: "Dr. Juan Pérez",
      specialty: "Cardiología",
      date: "2025-06-26",
      time: "10:00 AM",
      status: "confirmed" as const,
      type: "Consulta General",
    },
    {
      id: 2,
      patient: "Carlos Rodríguez",
      doctor: "Dra. Ana López",
      specialty: "Dermatología",
      date: "2025-06-26",
      time: "11:30 AM",
      status: "pending" as const,
      type: "Revisión",
    },
    {
      id: 3,
      patient: "Ana Martínez",
      doctor: "Dr. Luis García",
      specialty: "Neurología",
      date: "2025-06-26",
      time: "2:00 PM",
      status: "confirmed" as const,
      type: "Consulta Especializada",
    },
  ]

  const AppointmentCard = ({ appointment }: { appointment: (typeof appointments)[0] }) => (
    <TouchableOpacity style={globalStyles.appointmentCard}>
      <View style={globalStyles.appointmentHeader}>
        <View style={globalStyles.timeContainer}>
          <Clock color={colors.text.secondary} size={16} />
          <Text style={[globalStyles.body, { fontWeight: '600', marginLeft: spacing.sm }]}>{appointment.time}</Text>        </View>
        <StatusBadge status={appointment.status} />
      </View>
      <View style={globalStyles.appointmentDetails}>
        <Text style={globalStyles.patientName}>{appointment.patient}</Text>
        <Text style={globalStyles.doctorName}>{appointment.doctor}</Text>
        <Text style={globalStyles.specialty}>{appointment.specialty}</Text>
        <Text style={[globalStyles.captionMuted, { marginTop: spacing.xs }]}>{appointment.type}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header optimizado */}
      <View style={globalStyles.header}>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>Reservas de Citas</Text>
          <Text style={globalStyles.headerSubtitle}>Gestiona las citas médicas</Text>
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, globalStyles.iconButtonPrimary]}>
          <Plus color={colors.text.inverse} size={24} />
        </TouchableOpacity>
      </View>

      {/* Filtros optimizados */}
      <View style={globalStyles.filtersContainer}>
        <TouchableOpacity style={globalStyles.filterButton}>
          <Search color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.filterButton}>
          <Filter color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.filterButton}>
          <Calendar color={colors.text.secondary} size={20} />
          <Text style={globalStyles.filterText}>Fecha</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
        {/* Sección de hoy */}
        <View style={globalStyles.section}>
          <View style={[globalStyles.spaceBetween, { marginBottom: spacing.lg }]}>
            <Text style={globalStyles.sectionTitle}>Hoy - 26 de Junio</Text>
            <View style={globalStyles.row}>
              <Text style={[globalStyles.captionMuted, { color: colors.primary }]}>{appointments.length} citas</Text>
              <TrendingUp color={colors.primary} size={16} style={{ marginLeft: spacing.xs }} />
            </View>
          </View>
          <View style={globalStyles.appointmentsList}>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </View>
        </View>

        {/* Estado vacío para próximas citas */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Próximas Citas</Text>
          <View style={globalStyles.emptyState}>
            <Calendar color={colors.text.muted} size={48} />
            <Text style={globalStyles.emptyStateText}>No hay más citas programadas</Text>
            <Text style={globalStyles.emptyStateSubtext}>Las futuras citas aparecerán aquí</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
