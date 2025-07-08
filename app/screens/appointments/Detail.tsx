// roddek-dev/rn_eps_agendamiento/RN_EPS_Agendamiento/app/screens/appointments/Detail.tsx

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  UserCheck,
  Calendar,
  ClipboardList,
  Heart,
} from 'lucide-react-native';

// Estilos, componentes y tipos
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import {
  AppNavigationProp,
  AppointmentStackParamList,
} from '@/app/navigation/types';
import { EmptyState } from '@/components/EmptyState';

// Servicio y tipo de datos
import {
  getAppointmentById,
  type Appointment,
} from '@/app/Services/AppointmentService';
import dayjs from 'dayjs';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<AppointmentStackParamList, 'AppointmentDetail'>>();
  const { id } = route.params;

  // --- ESTADO ---
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  // --- EFECTO PARA CARGAR DATOS ---
  useEffect(() => {
    const loadAppointmentDetails = async () => {
      setLoading(true);
      const result = await getAppointmentById(id);

      if (result.success) {
        setAppointment(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message || 'No se pudieron obtener los detalles de la cita.',
          [{ text: 'Volver', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
    };

    loadAppointmentDetails();
  }, [id, navigation]);

  // --- RENDERIZADO CONDICIONAL ---
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!appointment) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ProfileHeader
          title="Detalle de Cita"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon={ClipboardList}
          title="Cita no encontrada"
          subtitle="No se pudo cargar la información de la cita. Por favor, intenta de nuevo."
          buttonText="Volver a la lista"
          onButtonPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle de Cita"
        subtitle={`ID de la Cita: ${id}`}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('AppointmentEdit', { id: id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Principal</Text>
          <DetailRow
            icon={Calendar}
            label="Fecha y Hora"
            value={dayjs(appointment.appointment_time).format(
              'DD/MM/YYYY, h:mm A'
            )}
            color={colors.primary}
          />
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>
            Participantes y Servicio
          </Text>
          <DetailRow
            icon={User}
            label="ID Paciente"
            value={String(appointment.patient_id)}
          />
          <DetailRow
            icon={UserCheck}
            label="ID Doctor"
            value={String(appointment.doctor_id)}
          />
          <DetailRow
            icon={Heart}
            label="ID Servicio"
            value={String(appointment.service_id || 'No especificado')}
          />
        </View>
      </ScrollView>
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
