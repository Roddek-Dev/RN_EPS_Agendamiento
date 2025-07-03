import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, User, UserCheck } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButtons } from '@/components/ActionButtons';
import { CrudsStackParamList } from '@/app/navigation/types';

export default function AppointmentsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const appointments = [
    {
      id: 1,
      patient: 'María González',
      doctor: 'Dr. Juan Pérez',
      date: '2025-06-27',
      time: '10:00 AM',
      status: 'confirmed' as const,
      type: 'Consulta General',
    },
    {
      id: 2,
      patient: 'Carlos Rodríguez',
      doctor: 'Dra. Ana López',
      date: '2025-06-27',
      time: '11:30 AM',
      status: 'pending' as const,
      type: 'Revisión',
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      doctor: 'Dr. Luis García',
      date: '2025-06-28',
      time: '2:00 PM',
      status: 'confirmed' as const,
      type: 'Consulta Especializada',
    },
  ];

  const AppointmentCard = ({
    appointment,
  }: {
    appointment: (typeof appointments)[0];
  }) => (
    <View style={globalStyles.listItem}>
      <View style={globalStyles.listItemContent}>
        <View style={globalStyles.spaceBetween}>
          <View style={[globalStyles.row, { flexShrink: 1, marginRight: 8 }]}>
            <Calendar color={colors.primary} size={16} />
            <Text
              style={[
                globalStyles.caption,
                { color: colors.primary, fontWeight: '600', marginLeft: 6 },
              ]}
            >
              {appointment.date}
            </Text>
            <Clock
              color={colors.text.secondary}
              size={16}
              style={{ marginLeft: 12 }}
            />
            <Text
              style={[
                globalStyles.caption,
                { fontWeight: '600', marginLeft: 6 },
              ]}
            >
              {appointment.time}
            </Text>
          </View>
          <StatusBadge status={appointment.status} />
        </View>
        <Text style={[globalStyles.itemTitle, { marginVertical: 8 }]}>
          {appointment.type}
        </Text>
        <View style={{ gap: 4, marginBottom: 8 }}>
          <View style={globalStyles.row}>
            <User color={colors.text.secondary} size={14} />
            <Text style={[globalStyles.caption, { marginLeft: 6 }]}>
              Paciente: {appointment.patient}
            </Text>
          </View>
          <View style={globalStyles.row}>
            <UserCheck color={colors.text.secondary} size={14} />
            <Text style={[globalStyles.caption, { marginLeft: 6 }]}>
              Doctor: {appointment.doctor}
            </Text>
          </View>
        </View>
      </View>
      <ActionButtons
        onView={() => navigation.navigate('AppointmentDetail', { id: appointment.id })}
        onEdit={() => navigation.navigate('AppointmentEdit', { id: appointment.id })}
      />
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader
        placeholder="Buscar por paciente, doctor..."
        onAdd={() => navigation.navigate('AppointmentCreate')}
      />
      <FlatList
        data={appointments}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
