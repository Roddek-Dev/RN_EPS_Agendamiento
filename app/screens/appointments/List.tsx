import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Inbox } from 'lucide-react-native';
import dayjs from 'dayjs';

import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import { AppNavigationProp } from '@/app/navigation/types';

// Servicios y Tipos necesarios
import {
  getAppointments,
  deleteAppointment,
  type Appointment,
} from '@/app/Services/AppointmentService';
import { getPatients, type Patient } from '@/app/Services/PatientService';
import { getDoctors, type Doctor } from '@/app/Services/DoctorService';

// Interfaz para los datos combinados
interface AppointmentWithDetails extends Appointment {
  patientName: string;
  doctorName: string;
}

export default function AppointmentListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentsResult, patientsResult, doctorsResult] =
        await Promise.all([getAppointments(), getPatients(), getDoctors()]);

      if (appointmentsResult.success) setAppointments(appointmentsResult.data);
      if (patientsResult.success) setPatients(patientsResult.data);
      if (doctorsResult.success) setDoctors(doctorsResult.data);
    } catch (error) {
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetData();
    }, [handleGetData])
  );

  // Combinar datos para mostrar nombres en lugar de IDs
  const displayedAppointments: AppointmentWithDetails[] = useMemo(() => {
    const patientsMap = new Map(patients.map((p) => [p.id, p.name]));
    const doctorsMap = new Map(doctors.map((d) => [d.id, d.name]));

    return appointments.map((appointment) => ({
      ...appointment,
      patientName:
        patientsMap.get(appointment.patient_id) || 'Paciente no encontrado',
      doctorName:
        doctorsMap.get(appointment.doctor_id) || 'Doctor no encontrado',
    }));
  }, [appointments, patients, doctors]);

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
        data={displayedAppointments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay citas registradas"
            subtitle="Crea una nueva cita para empezar."
            buttonText="Agendar Cita"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item, index }) => {
          const itemColors = [
            colors.primary,
            colors.secondary,
            colors.warning,
            colors.purple,
            colors.accent,
          ];
          const iconColor = itemColors[index % itemColors.length];
          return (
            <ListItemCard
              title={item.patientName}
              subtitle={`Dr(a). ${item.doctorName}`}
              trailingText={dayjs(item.appointment_time).format(
                'DD/MM/YYYY hh:mm A'
              )}
              iconBackgroundColor={iconColor}
              icon={<Calendar color={colors.text.inverse} size={22} />}
              onPress={() =>
                navigation.navigate('AppointmentDetail', { id: item.id })
              }
              onEdit={() =>
                navigation.navigate('AppointmentEdit', { id: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          );
        }}
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
