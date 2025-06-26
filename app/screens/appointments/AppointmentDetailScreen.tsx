import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Edit,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  UserCheck,
  HeartPulse,
} from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';
import React from 'react';

type Appointment = {
  id: number;
  patient_id: number;
  patient_name: string;
  doctor_id: number;
  doctor_name: string;
  service_id: number;
  service_name: string;
  appointment_time: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
};

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock data - in real app this would come from API
  const appointment: Appointment = {
    id: Number(id),
    patient_id: 1,
    patient_name: 'María González',
    doctor_id: 1,
    doctor_name: 'Dr. Juan Pérez',
    service_id: 1,
    service_name: 'Consulta General',
    appointment_time: '2024-01-15 10:00:00',
    status: 'scheduled',
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return {
      date: date.toLocaleDateString('es-ES', options),
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const { date, time } = formatDateTime(appointment.appointment_time);

  const getStatusStyles = () => {
    switch (appointment.status) {
      case 'completed':
        return {
          bg: colors.success,
          text: colors.successText,
          label: 'Completada',
        };
      case 'cancelled':
        return { bg: colors.error, text: colors.errorText, label: 'Cancelada' };
      default:
        return {
          bg: colors.pending,
          text: colors.pendingText,
          label: 'Programada',
        };
    }
  };

  const statusStyles = getStatusStyles();

  const renderDetailRow = (
    icon: React.ReactNode,
    value: string,
    iconColor?: string,
    textColor?: string,
    textWeight?: 'normal' | 'bold' | '600'
  ) => (
    <View style={globalStyles.detailRow}>
      {React.cloneElement(
        icon as React.ReactElement<{ color?: string; size?: number }>,
        {
          color: iconColor || colors.text.secondary,
          size: 20,
        }
      )}
      <View style={globalStyles.detailIcon} />
      <Text
        style={[
          globalStyles.detailText,
          textColor && { color: textColor },
          textWeight && { fontWeight: textWeight },
        ]}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <TouchableOpacity
          style={globalStyles.iconButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>Detalle de Cita</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/(main)/cruds/appointments/edit/${id}`)}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Información de la cita */}
        <View style={globalStyles.card}>
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
              Información de la Cita
            </Text>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Fecha</Text>
              {renderDetailRow(
                <Calendar />,
                date,
                colors.primary,
                colors.primary,
                '600'
              )}
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Hora</Text>
              {renderDetailRow(<Clock />, time)}
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Paciente</Text>
              {renderDetailRow(<User />, appointment.patient_name)}
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Doctor</Text>
              {renderDetailRow(<UserCheck />, appointment.doctor_name)}
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Servicio</Text>
              {renderDetailRow(
                <HeartPulse />,
                appointment.service_name || 'Sin servicio específico',
                colors.accent
              )}
            </View>
          </View>
        </View>

        {/* Estado de la cita */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estado de la Cita</Text>
          <View
            style={[
              globalStyles.statusBadge,
              {
                backgroundColor: statusStyles.bg,
                alignSelf: 'flex-start',
                marginTop: 8,
              },
            ]}
          >
            <Text
              style={[globalStyles.statusText, { color: statusStyles.text }]}
            >
              {statusStyles.label}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
