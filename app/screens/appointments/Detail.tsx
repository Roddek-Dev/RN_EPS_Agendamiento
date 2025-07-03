import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  UserCheck,
  Calendar,
  Clock,
  ClipboardList,
  MessageSquare,
  FileText,
} from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { StatusBadge } from '@/components/StatusBadge';
import {
  AppointmentStackParamList,
  AppointmentNavigationProp,
} from '@/app/navigation/types';

export default function AppointmentDetailScreen() {
  const navigation = useNavigation<AppointmentNavigationProp>();
  const route = useRoute<RouteProp<AppointmentStackParamList, 'Detail'>>();
  const { id } = route.params;

  const appointment = {
    id: id,
    patient: 'María González',
    doctor: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    date: '27 de Junio, 2025',
    time: '10:00 AM',
    duration: 30,
    type: 'Consulta General',
    status: 'confirmed' as const,
    reason: 'Dolor en el pecho y mareos ocasionales',
    notes: 'Paciente con antecedentes de hipertensión. Tomar presión arterial.',
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle de Cita"
        subtitle={`ID de la Cita: ${id}`}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('Edit', { id: id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.spaceBetween}>
            <Text style={globalStyles.sectionTitle}>Estado de la Cita</Text>
            <StatusBadge status={appointment.status} />
          </View>
        </View>
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
