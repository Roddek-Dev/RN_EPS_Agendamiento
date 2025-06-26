import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, ArrowLeft, Calendar, Clock, User, UserCheck, Heart } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const appointment = {
    id: Number(id),
    patient_id: 1,
    patient_name: 'María González',
    doctor_id: 1,
    doctor_name: 'Dr. Juan Pérez',
    service_id: 1,
    service_name: 'Consulta General',
    appointment_time: '2024-01-15 10:00:00'
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const dateStr = date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { date: dateStr, time: timeStr };
  };

  const editAppointment = () => {
    router.push(`/(main)/cruds/appointments/edit/${id}` as any);
  };

  const goBack = () => {
    router.back();
  };

  const { date, time } = formatDateTime(appointment.appointment_time);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle de Cita</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={editAppointment}>
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Información de la Cita</Text>
            
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Fecha</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <Calendar color={colors.primary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8, color: colors.primary, fontWeight: '600' }]}>
                    {date}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Hora</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <Clock color={colors.text.secondary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8, fontWeight: '600' }]}>
                    {time}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Paciente</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <User color={colors.text.secondary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8 }]}>
                    {appointment.patient_name}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Doctor</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <UserCheck color={colors.text.secondary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8 }]}>
                    {appointment.doctor_name}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Servicio</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <Heart color={colors.accent} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8 }]}>
                    {appointment.service_name || 'Sin servicio específico'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estado de la Cita</Text>
          <View style={[globalStyles.statusBadge, { backgroundColor: colors.success, alignSelf: 'flex-start' }]}>
            <Text style={[globalStyles.statusText, { color: colors.successText }]}>
              Programada
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}