import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, User, UserCheck, Inbox } from 'lucide-react-native';

// Estilos y componentes reutilizables
import { globalStyles, colors } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { StatusBadge } from '@/components/StatusBadge';

// Mapea los estados del backend a los aceptados por StatusBadge
export const mapStatus = (status: 'scheduled' | 'completed' | 'canceled' | undefined): React.ComponentProps<typeof StatusBadge>["status"] => {
  switch (status) {
    case 'scheduled':
      return 'pending'; // O 'confirmed' si lo prefieres
    case 'canceled':
      return 'cancelled';
    case 'completed':
      return 'completed';
    default:
      return 'pending';
  }
};
import { ActionButtons } from '@/components/ActionButtons';
import { EmptyState } from '@/components/EmptyState';

// Servicios y tipos de datos
import {
  getAppointments,
  deleteAppointment,
  type Appointment,
} from '@/app/Services/AppointmentService';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // --- MANEJO DE DATOS ---
  const handleGetAppointments = async () => {
    setLoading(true);
    const result = await getAppointments();
    if (result.success) {
      setAppointments(result.data);
    } else {
      Alert.alert('Error', result.message);
    }
    setLoading(false);
  };

  // useFocusEffect se ejecuta cada vez que la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      handleGetAppointments();
    }, [])
  );

  // --- NAVEGACIÓN Y ACCIONES ---
  const handleCreate = () => {
    navigation.navigate('AppointmentCreate');
  };

  const handleEdit = (appointment: Appointment) => {
    navigation.navigate('AppointmentEdit', { id: appointment.id }); // Pasamos el ID para cargarlo en la pantalla de edición
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Eliminar Cita',
      '¿Estás seguro de que deseas eliminar esta cita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteAppointment(id);
            if (result.success) {
              Alert.alert('Éxito', 'Cita eliminada correctamente.');
              setAppointments((prev) => prev.filter((a) => a.id !== id));
            } else {
              Alert.alert('Error', result.message || 'No se pudo eliminar la cita.');
            }
          },
        },
      ]
    );
  };

  // --- RENDERIZADO DEL COMPONENTE DE CADA CITA ---
  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <View style={globalStyles.listItem}>
      <View style={globalStyles.listItemContent}>
        <View style={globalStyles.spaceBetween}>
          <View style={[globalStyles.row, { flexShrink: 1, marginRight: 8 }]}>
            <Calendar color={colors.primary} size={16} />
            <Text style={[globalStyles.caption, { color: colors.primary, fontWeight: '600', marginLeft: 6 }]}>
              {appointment.date}
            </Text>
            <Clock color={colors.text.secondary} size={16} style={{ marginLeft: 12 }}/>
            {/* Asumiendo que 'description' puede contener la hora */}
            <Text style={[globalStyles.caption, { fontWeight: '600', marginLeft: 6 }]}>
              {appointment.description}
            </Text>
          </View>
          <StatusBadge status={mapStatus(appointment.status)} />
        </View>
        <Text style={[globalStyles.itemTitle, { marginVertical: 8 }]}>
          ID Paciente: {appointment.patient_id}
        </Text>
        <View style={{ gap: 4, marginBottom: 8 }}>
          <View style={globalStyles.row}>
            <UserCheck color={colors.text.secondary} size={14} />
            <Text style={[globalStyles.caption, { marginLeft: 6 }]}>
              Doctor ID: {appointment.doctor_id}
            </Text>
          </View>
        </View>
      </View>
      <ActionButtons
        onView={() => navigation.navigate('AppointmentDetail', { id: appointment.id })}
        onEdit={() => handleEdit(appointment)}
        onDelete={() => handleDelete(appointment.id)}
        showDelete // Mostramos el botón de eliminar
      />
    </View>
  );

  // --- RENDERIZADO PRINCIPAL ---
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader
        placeholder="Buscar por paciente, doctor..."
        onAdd={handleCreate}
      />
      <FlatList
        data={appointments}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay citas registradas"
            subtitle="Crea tu primera cita para empezar a gestionar."
            buttonText="Crear Nueva Cita"
            onButtonPress={handleCreate}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});