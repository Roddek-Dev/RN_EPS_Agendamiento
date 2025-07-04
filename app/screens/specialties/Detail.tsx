import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  FileText,
  Users,
  BarChart2,
  Calendar,
  Activity,
} from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { StatItem } from '@/components/StatItem';
import { MetadataSection } from '@/components/MetadataSection';
import { AppNavigationProp, SpecialtyStackParamList } from '@/app/navigation/types';

export default function SpecialtyDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<SpecialtyStackParamList, 'SpecialtyDetail'>>();
  const { id } = route.params;

  const specialty = {
    id: id,
    name: 'Cardiología',
    description:
      'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.',
    status: 'active' as const,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    doctors: [
      { id: 1, name: 'Dr. Juan Pérez', experience: '10 años' },
      { id: 2, name: 'Dra. María González', experience: '8 años' },
      { id: 3, name: 'Dr. Carlos López', experience: '12 años' },
    ],
    services: [
      'Electrocardiograma',
      'Ecocardiograma',
      'Prueba de esfuerzo',
      'Holter',
      'Consulta cardiológica',
    ],
    appointments: { total: 45, thisMonth: 12, pending: 3 },
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle de Especialidad"
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('SpecialtyEdit', { id: id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View
          style={[
            globalStyles.card,
            { alignItems: 'center', marginBottom: 20 },
          ]}
        >
          <View
            style={[
              globalStyles.avatarLarge,
              {
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 16,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Heart color={colors.surface} size={48} />
          </View>
          <Text
            style={[globalStyles.title, { fontSize: 22, textAlign: 'center' }]}
          >
            {specialty.name}
          </Text>
          <View style={globalStyles.statContainer}>
            <StatItem
              icon={<Users color={colors.text.secondary} size={24} />}
              value={`${specialty.doctors.length}`}
              label="Doctores"
            />
            <StatItem
              icon={<BarChart2 color={colors.text.secondary} size={24} />}
              value={`${specialty.appointments.total}`}
              label="Citas Totales"
            />
          </View>
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información General</Text>
          <DetailRow
            icon={FileText}
            value={specialty.description}
            label="Descripción"
          />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Doctores Disponibles</Text>
          {specialty.doctors.map((doctor) => (
            <View
              key={doctor.id}
              style={[
                globalStyles.row,
                {
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View>
                <Text style={globalStyles.itemTitle}>{doctor.name}</Text>
                <Text style={globalStyles.caption}>
                  {doctor.experience} de experiencia
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Servicios Disponibles</Text>
          <View style={{ gap: 8 }}>
            {specialty.services.map((service, index) => (
              <View
                key={index}
                style={[
                  globalStyles.row,
                  { alignItems: 'center', gap: 8, paddingVertical: 6 },
                ]}
              >
                <Activity color={colors.primary} size={16} />
                <Text style={globalStyles.detailText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <DetailRow
            icon={Calendar}
            value={`${specialty.appointments.thisMonth} citas`}
            label="Este mes"
          />
          <DetailRow
            icon={BarChart2}
            value={`${specialty.appointments.total} citas`}
            label="En total"
          />
          <DetailRow
            icon={Activity}
            value={`${specialty.appointments.pending} citas`}
            label="Pendientes"
          />
        </View>
        <MetadataSection
          title="Información del Sistema"
          items={[
            { label: 'Fecha de Creación', value: specialty.createdAt },
            { label: 'Última Actualización', value: specialty.updatedAt },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
