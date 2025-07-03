import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Briefcase,
  Star,
  Phone,
  Mail,
  Calendar,
  Users,
  Activity,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { StatItem } from '@/components/StatItem';
import { MetadataSection } from '@/components/MetadataSection';
import {
  DoctorStackParamList,
  DoctorNavigationProp,
} from '@/app/navigation/types';

export default function DoctorDetailScreen() {
  const navigation = useNavigation<DoctorNavigationProp>();
  const route = useRoute<RouteProp<DoctorStackParamList, 'Detail'>>();
  const { id } = route.params;

  const doctor = {
    id: id,
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    experience: '10 años',
    email: 'juan.perez@clinica.com',
    phone: '+57 310 123 4567',
    rating: 4.8,
    appointments: 156,
    status: 'available' as const,
    createdAt: '2020-05-10',
    updatedAt: '2023-12-15',
    schedule: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    education:
      'Universidad Nacional de Colombia, Especialización en Cardiología',
    avatar:
      'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    patients: 45,
    completedAppointments: 142,
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Perfil del Doctor"
        subtitle={doctor.name}
        status={doctor.status}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('Edit', { id: id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.profileSection}>
          <Image
            source={{ uri: doctor.avatar }}
            style={globalStyles.profileAvatar}
          />
          <Text
            style={[
              globalStyles.title,
              { textAlign: 'center', marginBottom: spacing.md },
            ]}
          >
            {doctor.name}
          </Text>
          <Text
            style={[
              globalStyles.subtitle,
              { textAlign: 'center', marginBottom: spacing.xl },
            ]}
          >
            {doctor.specialty}
          </Text>
          <View style={globalStyles.statContainer}>
            <StatItem
              icon={<Star color="#fbbf24" size={24} fill="#fbbf24" />}
              value={doctor.rating}
              label="Rating"
            />
            <StatItem
              icon={<Users color={colors.text.secondary} size={24} />}
              value={doctor.patients}
              label="Pacientes"
            />
            <StatItem
              icon={<Calendar color={colors.text.secondary} size={24} />}
              value={doctor.completedAppointments}
              label="Citas"
            />
          </View>
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Profesional</Text>
          <DetailRow
            icon={Briefcase}
            label="Especialidad"
            value={doctor.specialty}
          />
          <DetailRow
            icon={Activity}
            label="Experiencia"
            value={doctor.experience}
          />
          <DetailRow icon={Calendar} label="Horario" value={doctor.schedule} />
          <DetailRow icon={Users} label="Educación" value={doctor.education} />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información de Contacto</Text>
          <DetailRow icon={Phone} label="Teléfono" value={doctor.phone} />
          <DetailRow icon={Mail} label="Email" value={doctor.email} />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <DetailRow
            icon={Users}
            label="Pacientes atendidos"
            value={`${doctor.patients} pacientes`}
          />
          <DetailRow
            icon={Calendar}
            label="Citas completadas"
            value={`${doctor.completedAppointments} citas`}
          />
          <DetailRow
            icon={Activity}
            label="Citas pendientes"
            value={`${
              doctor.appointments - doctor.completedAppointments
            } citas`}
          />
        </View>
        <MetadataSection
          title="Información del Sistema"
          items={[
            { label: 'Fecha de Registro', value: doctor.createdAt },
            { label: 'Última Actualización', value: doctor.updatedAt },
            {
              label: 'Estado',
              value:
                doctor.status === 'available' ? 'Disponible' : 'No Disponible',
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
