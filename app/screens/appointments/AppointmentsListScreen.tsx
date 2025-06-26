import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Calendar, Clock, User, UserCheck } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

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
      appointment_time: '2024-01-15 10:00:00',
    },
    {
      id: 2,
      patient_id: 2,
      patient_name: 'Carlos Rodríguez',
      doctor_id: 2,
      doctor_name: 'Dra. María González',
      service_id: null,
      service_name: null,
      appointment_time: '2024-01-15 11:30:00',
    },
    {
      id: 3,
      patient_id: 3,
      patient_name: 'Ana Martínez',
      doctor_id: 3,
      doctor_name: 'Dr. Carlos López',
      service_id: 3,
      service_name: 'Ecocardiograma',
      appointment_time: '2024-01-16 14:00:00',
    },
  ];
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const dateStr = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { date: dateStr, time: timeStr };
  };

  const viewDetails = (id: number) =>
    router.push(`/(main)/cruds/appointments/${id}`);
  const editAppointment = (id: number) =>
    router.push(`/(main)/cruds/appointments/edit/${id}`);
  const createAppointment = () =>
    router.push('/(main)/cruds/appointments/create');

  const renderItem = ({ item }: { item: any }) => {
    const { date, time } = formatDateTime(item.appointment_time);
    return (
      <View style={globalStyles.listItem}>
        <View style={globalStyles.listItemContent}>
          <Text style={globalStyles.itemTitle}>{item.patient_name}</Text>
          <Text style={globalStyles.caption}>Doctor: {item.doctor_name}</Text>
          <Text
            style={[
              globalStyles.caption,
              { color: colors.primary, fontWeight: '600' },
            ]}
          >
            {date} - {time}
          </Text>
        </View>
        <View style={globalStyles.listItemActions}>
          <TouchableOpacity
            style={[
              globalStyles.actionButton,
              { backgroundColor: colors.info },
            ]}
            onPress={() => viewDetails(item.id)}
          >
            <Eye color={colors.infoText} size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.actionButton,
              { backgroundColor: colors.success },
            ]}
            onPress={() => editAppointment(item.id)}
          >
            <Edit color={colors.successText} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.header, { gap: 12 }]}>
        <View style={globalStyles.searchContainer}>
          <Search
            color={colors.text.secondary}
            size={20}
            style={globalStyles.searchIcon}
          />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar por paciente..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={createAppointment}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={globalStyles.content}
        style={globalStyles.flex1}
      />
    </SafeAreaView>
  );
}