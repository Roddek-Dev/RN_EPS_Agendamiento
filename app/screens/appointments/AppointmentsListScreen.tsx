import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Calendar, Clock, User, UserCheck } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function AppointmentsListScreen() {
  const appointments = [
    { 
      id: 1, 
      patient_id: 1,
      patient_name: 'María González',
      doctor_id: 1,
      doctor_name: 'Dr. Juan Pérez',
      service_id: 1,
      service_name: 'Consulta General',
      appointment_time: '2024-01-15 10:00:00'
    },
    { 
      id: 2, 
      patient_id: 2,
      patient_name: 'Carlos Rodríguez',
      doctor_id: 2,
      doctor_name: 'Dra. María González',
      service_id: null,
      service_name: null,
      appointment_time: '2024-01-15 11:30:00'
    },
    { 
      id: 3, 
      patient_id: 3,
      patient_name: 'Ana Martínez',
      doctor_id: 3,
      doctor_name: 'Dr. Carlos López',
      service_id: 3,
      service_name: 'Ecocardiograma',
      appointment_time: '2024-01-16 14:00:00'
    },
  ];

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const dateStr = date.toLocaleDateString('es-ES');
    const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { date: dateStr, time: timeStr };
  };

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/appointments/${id}` as any);
  };

  const editAppointment = (id: number) => {
    router.push(`/(main)/cruds/appointments/edit/${id}` as any);
  };

  const createAppointment = () => {
    router.push('/(main)/cruds/appointments/create' as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar citas..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={createAppointment}>
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.listContainer}>
          {appointments.map((appointment) => {
            const { date, time } = formatDateTime(appointment.appointment_time);
            return (
              <View key={appointment.id} style={globalStyles.listItem}>
                <View style={globalStyles.listItemContent}>
                  <View style={[globalStyles.row, { marginBottom: 8 }]}>
                    <Calendar color={colors.primary} size={16} />
                    <Text style={[globalStyles.caption, { marginLeft: 6, color: colors.primary, fontWeight: '600' }]}>
                      {date}
                    </Text>
                    <Clock color={colors.text.secondary} size={16} style={{ marginLeft: 12 }} />
                    <Text style={[globalStyles.caption, { marginLeft: 6, fontWeight: '600' }]}>
                      {time}
                    </Text>
                  </View>
                  
                  <View style={[globalStyles.row, { marginBottom: 4 }]}>
                    <User color={colors.text.secondary} size={14} />
                    <Text style={[globalStyles.caption, { marginLeft: 6 }]}>
                      Paciente: {appointment.patient_name}
                    </Text>
                  </View>
                  
                  <View style={[globalStyles.row, { marginBottom: 4 }]}>
                    <UserCheck color={colors.text.secondary} size={14} />
                    <Text style={[globalStyles.caption, { marginLeft: 6 }]}>
                      Doctor: {appointment.doctor_name}
                    </Text>
                  </View>
                  
                  {appointment.service_name && (
                    <Text style={[globalStyles.small, { fontStyle: 'italic', color: colors.text.muted }]}>
                      Servicio: {appointment.service_name}
                    </Text>
                  )}
                </View>
                
                <View style={globalStyles.listItemActions}>
                  <TouchableOpacity
                    style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
                    onPress={() => viewDetails(appointment.id)}
                  >
                    <Eye color={colors.primary} size={16} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[globalStyles.actionButton, { backgroundColor: colors.success }]}
                    onPress={() => editAppointment(appointment.id)}
                  >
                    <Edit color={colors.secondary} size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}