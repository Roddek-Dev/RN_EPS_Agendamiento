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

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams();

  const patient = {
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
    iconColor?: string
  ) => (
    <View style={[globalStyles.row, { marginBottom: spacing.sm }]}>
      <IconComponent color={iconColor || colors.text.secondary} size={20} />
      <Text style={[globalStyles.detailText, { marginLeft: spacing.sm }]}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
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
            <View style={{ marginLeft: spacing.lg }}>
              <Text style={globalStyles.headerTitle}>{patient.name}</Text>
              <View
                style={[
                  globalStyles.statusBadge,
                  {
                    backgroundColor:
                      patient.status === 'active'
                        ? colors.success
                        : colors.pending,
                    alignSelf: 'flex-start',
                    marginTop: spacing.xs,
                  },
                ]}
              >
                <Text
                  style={[
                    globalStyles.statusText,
                    {
                      color:
                        patient.status === 'active'
                          ? colors.successText
                          : colors.pendingText,
                    },
                  ]}
                >
                  {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                </Text>
              </View>
            </View>
          </View>

          <View style={[globalStyles.row, { justifyContent: 'space-around' }]}>
            <View style={globalStyles.center}>
              <Text style={[globalStyles.itemTitle, { color: colors.primary }]}>
                {patient.age}
              </Text>
              <Text style={globalStyles.caption}>Años</Text>
            </View>
            <View style={globalStyles.center}>
              <Text style={[globalStyles.itemTitle, { color: colors.primary }]}>
                {patient.totalAppointments}
              </Text>
              <Text style={globalStyles.caption}>Citas</Text>
            </View>
            <View style={globalStyles.center}>
              <Text style={[globalStyles.itemTitle, { color: colors.primary }]}>
                {patient.bloodType}
              </Text>
              <Text style={globalStyles.caption}>Tipo Sanguíneo</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Personal</Text>
          {renderDetailItem(Phone, patient.phone)}
          {renderDetailItem(Mail, patient.email)}
          {renderDetailItem(MapPin, patient.address)}
          {renderDetailItem(Calendar, `Nacimiento: ${patient.birthDate}`)}
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Historial</Text>
          {renderDetailItem(Clock, `Última cita: ${patient.lastAppointment}`)}
          {renderDetailItem(Clock, `Total citas: ${patient.totalAppointments}`)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
