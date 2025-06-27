// Ruta: /(main)/cruds/appointments/index.tsx (o la ruta que corresponda)

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList, // 1. Importar FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Search,
  CreditCard as Edit,
  Eye,
  Clock,
  User,
  UserCheck,
  Calendar,
} from 'lucide-react-native';
// 2. Importar los estilos globales y colores
import { globalStyles, colors } from '../../../utils/globalStyles';

// Datos de ejemplo
const appointments = [
  {
    id: 1,
    patient: 'María González',
    doctor: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    date: '2025-06-27',
    time: '10:00 AM',
    duration: 30,
    status: 'confirmed',
    type: 'Consulta General',
  },
  {
    id: 2,
    patient: 'Carlos Rodríguez',
    doctor: 'Dra. Ana López',
    specialty: 'Dermatología',
    date: '2025-06-27',
    time: '11:30 AM',
    duration: 45,
    status: 'pending',
    type: 'Revisión',
  },
  {
    id: 3,
    patient: 'Ana Martínez',
    doctor: 'Dr. Luis García',
    specialty: 'Neurología',
    date: '2025-06-28',
    time: '2:00 PM',
    duration: 60,
    status: 'confirmed',
    type: 'Consulta Especializada',
  },
  {
    id: 4,
    patient: 'Luis Herrera',
    doctor: 'Dra. Carmen Silva',
    specialty: 'Pediatría',
    date: '2025-06-28',
    time: '9:00 AM',
    duration: 30,
    status: 'cancelled',
    type: 'Control',
  },
];

export default function AppointmentsListScreen() {
  // 3. Funciones refactorizadas para usar colores globales
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

  // 4. Función para renderizar cada ítem en la FlatList
  const renderAppointment = ({ item: appointment }: { item: any }) => (
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

      <View style={globalStyles.listItemActions}>
        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
        >
          <Eye color={colors.primary} size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.actionButton,
            { backgroundColor: colors.success },
          ]}
        >
          <Edit color={colors.secondary} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.header, { gap: 12, borderBottomWidth: 0 }]}>
        <View style={globalStyles.searchContainer}>
          <Search
            color={colors.text.secondary}
            size={20}
            style={globalStyles.searchIcon}
          />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar por paciente, doctor..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// 5. ¡El StyleSheet local ya no es necesario! Se puede eliminar por completo.
