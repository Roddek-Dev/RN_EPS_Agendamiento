import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  UserCheck,
  Heart,
  Calendar,
  ClipboardList,
} from 'lucide-react-native';
import dayjs from 'dayjs';

import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { EmptyState } from '@/components/EmptyState';
import {
  AppNavigationProp,
  AppointmentStackParamList,
} from '@/app/navigation/types';

// Servicios y Tipos necesarios
import {
  getAppointmentById,
  type Appointment,
} from '@/app/Services/AppointmentService';
import { getPatientById, type Patient } from '@/app/Services/PatientService';
import { getDoctorById, type Doctor } from '@/app/Services/DoctorService';
import { getServiceById, type Service } from '@/app/Services/ServiceService';

export default function AppointmentDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<AppointmentStackParamList, 'AppointmentDetail'>>();
  const { id } = route.params;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      setLoading(true);
      try {
        const appointmentResult = await getAppointmentById(id);

        if (appointmentResult.success) {
          const appData = appointmentResult.data;
          setAppointment(appData);

          const [patientResult, doctorResult, serviceResult] =
            await Promise.all([
              getPatientById(appData.patient_id),
              getDoctorById(appData.doctor_id),
              appData.service_id
                ? getServiceById(appData.service_id)
                : Promise.resolve(null),
            ]);

          if (patientResult?.success) setPatient(patientResult.data);
          if (doctorResult?.success) setDoctor(doctorResult.data);
          if (serviceResult?.success) setService(serviceResult.data);
        } else {
          Alert.alert(
            'Error',
            appointmentResult.message || 'No se pudieron cargar los detalles.'
          );
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert(
          'Error Crítico',
          'Ocurrió un problema al obtener los datos.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointmentDetails();
  }, [id, navigation]);

  // ... (código de loading y empty state sin cambios)

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle de la Cita"
        // ✅ CAMBIO: Mostrar el nombre del paciente en el subtítulo
        subtitle={patient ? `Cita de ${patient.name}` : 'Cargando...'}
        onBack={() => navigation.goBack()}
        onEdit={() => {
          if (appointment?.id !== undefined) {
            navigation.navigate('AppointmentEdit', { id: appointment.id });
          }
        }}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información de la Cita</Text>
          <DetailRow
            icon={User}
            label="Paciente"
            value={patient?.name || 'Cargando...'}
            color={colors.primary}
          />
          <DetailRow
            icon={UserCheck}
            label="Doctor Asignado"
            value={doctor?.name || 'Cargando...'}
          />
          <DetailRow
            icon={Heart}
            label="Servicio"
            value={service?.name || 'No especificado'}
          />
          <DetailRow
            icon={Calendar}
            label="Fecha y Hora"
            value={dayjs(appointment?.appointment_time).format(
              'dddd, D [de] MMMM [de] YYYY - hh:mm A'
            )}
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
