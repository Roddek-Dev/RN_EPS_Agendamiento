import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Briefcase,
  Star,
  Phone,
  Mail,
  Calendar,
  Edit,
  ArrowLeft,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();

  const doctor = {
    id: Number(id),
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    experience: '10 años',
    email: 'juan.perez@clinica.com',
    phone: '+57 310 123 4567',
    rating: 4.8,
    appointments: 156,
    status: 'available',
    schedule: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    education: 'Universidad Nacional de Colombia',
  };

  const renderDetailItem = (
    IconComponent: any,
    text: string,
    iconColor?: string
  ) => (
    <View style={globalStyles.detailRow}>
      <View style={globalStyles.detailIcon}>
        <IconComponent color={iconColor || colors.text.secondary} size={20} />
      </View>
      <Text style={globalStyles.detailText}>{text}</Text>
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
          <Text style={globalStyles.headerTitle}>Detalle Doctor</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/(main)/cruds/doctors/edit/${id}`)}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Card de perfil principal */}
        <View style={globalStyles.card}>
          <View
            style={[
              globalStyles.row,
              { alignItems: 'center', marginBottom: spacing.lg },
            ]}
          >
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
              }}
              style={globalStyles.avatarLarge}
            />
            <View style={{ marginLeft: spacing.lg }}>
              <Text style={globalStyles.itemTitle}>{doctor.name}</Text>
              <View
                style={[
                  globalStyles.statusBadge,
                  {
                    backgroundColor:
                      doctor.status === 'available'
                        ? colors.success
                        : colors.pending,
                    alignSelf: 'flex-start',
                    marginTop: spacing.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    globalStyles.statusText,
                    {
                      color:
                        doctor.status === 'available'
                          ? colors.successText
                          : colors.pendingText,
                    },
                  ]}
                >
                  {doctor.status === 'available'
                    ? 'Disponible'
                    : 'No disponible'}
                </Text>
              </View>
            </View>
          </View>

          {/* Estadísticas */}
          <View style={[globalStyles.row, { justifyContent: 'space-around' }]}>
            <View style={{ alignItems: 'center' }}>
              <Star color={colors.warning} size={24} fill={colors.warning} />
              <Text style={[globalStyles.itemTitle, { marginTop: spacing.sm }]}>
                {doctor.rating}
              </Text>
              <Text style={globalStyles.caption}>Rating</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Calendar color={colors.primary} size={24} />
              <Text style={[globalStyles.itemTitle, { marginTop: spacing.sm }]}>
                {doctor.appointments}
              </Text>
              <Text style={globalStyles.caption}>Citas</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Briefcase color={colors.infoText} size={24} />
              <Text style={[globalStyles.itemTitle, { marginTop: spacing.sm }]}>
                {doctor.experience}
              </Text>
              <Text style={globalStyles.caption}>Experiencia</Text>
            </View>
          </View>
        </View>

        {/* Información Profesional */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Profesional</Text>
          {renderDetailItem(Briefcase, doctor.specialty, colors.primary)}
          {renderDetailItem(User, doctor.education)}
          {renderDetailItem(Calendar, doctor.schedule)}
        </View>

        {/* Contacto */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Contacto</Text>
          {renderDetailItem(Phone, doctor.phone)}
          {renderDetailItem(Mail, doctor.email)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
