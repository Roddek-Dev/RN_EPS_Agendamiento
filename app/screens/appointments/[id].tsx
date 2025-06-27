// Ruta: /(main)/cruds/appointments/[id].tsx

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  UserCheck,
  Calendar,
  Clock,
  ClipboardList,
  Edit,
  ArrowLeft, // 1. Importar el ícono para retroceder
  MessageSquare,
  FileText,
} from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

type DetailRowProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
  color = colors.text.secondary,
}: DetailRowProps) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={globalStyles.label}>{label}</Text>
    <View style={globalStyles.detailRow}>
      <Icon color={color} size={20} style={globalStyles.detailIcon} />
      <Text style={globalStyles.detailText}>{value}</Text>
    </View>
  </View>
);

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock data
  const appointment = {
    id: Number(id),
    patient: 'María González',
    doctor: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    date: '27 de Junio, 2025',
    time: '10:00 AM',
    duration: 30,
    type: 'Consulta General',
    status: 'confirmed',
    reason: 'Dolor en el pecho y mareos ocasionales',
    notes: 'Paciente con antecedentes de hipertensión. Tomar presión arterial.',
  };

  const goBack = () => router.back();
  const editAppointment = () =>
    router.push(`/(main)/cruds/appointments/edit/${id}`);

  // 2. Funciones refactorizadas para usar colores globales
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.pending;
      case 'cancelled':
        return colors.error;
      case 'completed':
        return colors.info;
      default:
        return colors.border;
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.successText;
      case 'pending':
        return colors.pendingText;
      case 'cancelled':
        return colors.errorText;
      case 'completed':
        return colors.infoText;
      default:
        return colors.text.secondary;
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
    <SafeAreaView style={globalStyles.container}>
      {/* 3. Cabecera Estandarizada */}
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle de Cita</Text>
          <Text style={globalStyles.headerSubtitle}>ID de la Cita: {id}</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={editAppointment}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Sección de Estado */}
        <View style={globalStyles.card}>
          <View style={globalStyles.spaceBetween}>
            <Text style={globalStyles.sectionTitle}>Estado de la Cita</Text>
            <View
              style={[
                globalStyles.statusBadge,
                { backgroundColor: getStatusColor(appointment.status) },
              ]}
            >
              <Text
                style={[
                  globalStyles.statusText,
                  { color: getStatusTextColor(appointment.status) },
                ]}
              >
                {getStatusText(appointment.status)}
              </Text>
            </View>
          </View>
        </View>

        {/* 4. Todas las secciones usan globalStyles.card */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Principal</Text>
          <DetailRow
            icon={Calendar}
            label="Fecha"
            value={appointment.date}
            color={colors.primary}
          />
          <DetailRow icon={Clock} label="Hora" value={appointment.time} />
          <DetailRow
            icon={ClipboardList}
            label="Tipo de Cita"
            value={appointment.type}
          />
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Participantes</Text>
          <DetailRow icon={User} label="Paciente" value={appointment.patient} />
          <DetailRow
            icon={UserCheck}
            label="Doctor"
            value={appointment.doctor}
          />
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Detalles de la Consulta</Text>
          <DetailRow
            icon={MessageSquare}
            label="Motivo de la Consulta"
            value={appointment.reason}
          />
          <DetailRow
            icon={FileText}
            label="Notas Adicionales"
            value={appointment.notes}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 5. ¡El StyleSheet local ya no es necesario! Se puede eliminar.
