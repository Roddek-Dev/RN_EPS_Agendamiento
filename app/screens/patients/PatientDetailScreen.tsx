import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Edit,
  ArrowLeft,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  age: number;
  bloodType: string;
  status: 'active' | 'inactive';
  lastAppointment: string;
  totalAppointments: number;
  avatar: string;
}

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams();

  // En una aplicación real, esto vendría de un estado global o API
  const patient: Patient = {
    id: Number(id),
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    birthDate: '1990-05-15',
    age: 33,
    bloodType: 'O+',
    status: 'active',
    lastAppointment: '2023-12-10',
    totalAppointments: 12,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  };

  const renderDetailItem = (
    IconComponent: React.ComponentType<any>,
    text: string,
    iconColor: string = colors.text.secondary
  ) => (
    <View style={[globalStyles.row, { marginBottom: spacing.md }]}>
      <View style={globalStyles.detailIcon}>
        <IconComponent color={iconColor} size={20} />
      </View>
      <Text style={globalStyles.detailText}>{text}</Text>
    </View>
  );

  const renderStatItem = (value: string | number, label: string) => (
    <View style={globalStyles.center}>
      <Text style={[globalStyles.itemTitle, { color: colors.primary }]}>
        {value}
      </Text>
      <Text style={globalStyles.caption}>{label}</Text>
    </View>
  );

  const getStatusConfig = (status: string) => {
    return status === 'active'
      ? {
          backgroundColor: colors.success,
          textColor: colors.successText,
          text: 'Activo',
        }
      : {
          backgroundColor: colors.pending,
          textColor: colors.pendingText,
          text: 'Inactivo',
        };
  };

  const statusConfig = getStatusConfig(patient.status);

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
          <Text style={globalStyles.headerTitle}>Detalle Paciente</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/(main)/cruds/patients/edit/${id}`)}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Patient Profile Card */}
        <View style={globalStyles.card}>
          <View
            style={[
              globalStyles.row,
              { alignItems: 'center', marginBottom: spacing.lg },
            ]}
          >
            <Image
              source={{ uri: patient.avatar }}
              style={globalStyles.avatarLarge}
            />
            <View style={{ marginLeft: spacing.lg, flex: 1 }}>
              <Text style={globalStyles.headerTitle}>{patient.name}</Text>
              <View
                style={[
                  globalStyles.statusBadge,
                  {
                    backgroundColor: statusConfig.backgroundColor,
                    alignSelf: 'flex-start',
                    marginTop: spacing.xs,
                  },
                ]}
              >
                <Text
                  style={[
                    globalStyles.statusText,
                    { color: statusConfig.textColor },
                  ]}
                >
                  {statusConfig.text}
                </Text>
              </View>
            </View>
          </View>

          {/* Statistics Row */}
          <View style={[globalStyles.row, { justifyContent: 'space-around' }]}>
            {renderStatItem(patient.age, 'Años')}
            {renderStatItem(patient.totalAppointments, 'Citas')}
            {renderStatItem(patient.bloodType, 'Tipo Sanguíneo')}
          </View>
        </View>

        {/* Personal Information Card */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Personal</Text>
          {renderDetailItem(Phone, patient.phone)}
          {renderDetailItem(Mail, patient.email)}
          {renderDetailItem(MapPin, patient.address)}
          {renderDetailItem(Calendar, `Nacimiento: ${patient.birthDate}`)}
        </View>

        {/* Medical History Card */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Historial Médico</Text>
          {renderDetailItem(Clock, `Última cita: ${patient.lastAppointment}`)}
          {renderDetailItem(
            User,
            `Total de citas: ${patient.totalAppointments}`
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
