// roddek-dev/rn_eps_agendamiento/RN_EPS_Agendamiento/app/screens/appointments/List.tsx

import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Inbox } from 'lucide-react-native';

// Componentes y estilos reutilizables
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';

// Servicios y tipos de datos
import {
  getAppointments,
  deleteAppointment,
  type Appointment,
} from '@/app/Services/AppointmentService';
import { AppNavigationProp } from '@/app/navigation/types';
import dayjs from 'dayjs';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // --- MANEJO DE DATOS ---
  const handleGetAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAppointments();
      if (result.success) {
        setAppointments(result.data);
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar las citas.'
        );
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []); // ✅ ARREGLO DE DEPENDENCIAS VACÍO

  useFocusEffect(
    useCallback(() => {
      handleGetAppointments();
    }, [handleGetAppointments])
  );

  // --- NAVEGACIÓN Y ACCIONES ---
  const handleCreate = () => navigation.navigate('AppointmentCreate');

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
              Alert.alert(
                'Error',
                result.message || 'No se pudo eliminar la cita.'
              );
            }
          },
        },
      ]
    );
  };

  // --- RENDERIZADO ---
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader placeholder="Buscar citas..." onAdd={handleCreate} />
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay citas registradas"
            subtitle="Crea tu primera cita para empezar a gestionar."
            buttonText="Crear Nueva Cita"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item }) => (
          <ListItemCard
            title={`Paciente ID: ${item.patient_id} - Doctor ID: ${item.doctor_id}`}
            subtitle={`Servicio ID: ${item.service_id || 'No asignado'}`}
            icon={<Calendar color={colors.primary} size={22} />}
            onPress={() =>
              navigation.navigate('AppointmentDetail', { id: item.id })
            }
            onEdit={() =>
              navigation.navigate('AppointmentEdit', { id: item.id })
            }
            onDelete={() => handleDelete(item.id)}
            trailingText={dayjs(item.appointment_time).format(
              'DD/MM/YYYY h:mm A'
            )}
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