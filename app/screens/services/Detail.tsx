import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Tag,
  FileText,
  DollarSign,
  BarChart2,
  Calendar,
} from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { StatItem } from '@/components/StatItem';
import { MetadataSection } from '@/components/MetadataSection';
import {
  ServiceStackParamList,
  ServiceNavigationProp,
} from '@/app/navigation/types';

export default function ServiceDetailScreen() {
  const navigation = useNavigation<ServiceNavigationProp>();
  const route = useRoute<RouteProp<ServiceStackParamList, 'Detail'>>();
  const { id } = route.params;

  const service = {
    id: id,
    name: 'Consulta General',
    description:
      'Consulta médica general con revisión completa del paciente, diagnóstico y formulación de tratamiento inicial.',
    price: 50000,
    status: 'available' as const,
    category: 'Consultas',
    createdAt: '2023-02-15',
    updatedAt: '2024-01-20',
    appointmentsThisMonth: 23,
    appointmentsTotal: 156,
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle del Servicio"
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('Edit', { id: id })}
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
            <Tag color={colors.surface} size={48} />
          </View>
          <Text
            style={[globalStyles.title, { fontSize: 22, textAlign: 'center' }]}
          >
            {service.name}
          </Text>
          <View style={globalStyles.statContainer}>
            <StatItem
              icon={<DollarSign color={colors.text.secondary} size={24} />}
              value={new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
              }).format(service.price)}
              label="Precio"
            />
            <StatItem
              icon={<BarChart2 color={colors.text.secondary} size={24} />}
              value={`${service.appointmentsTotal}`}
              label="Citas Totales"
            />
          </View>
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información General</Text>
          <DetailRow icon={Tag} value={service.category} label="Categoría" />
          <DetailRow
            icon={FileText}
            value={service.description}
            label="Descripción"
          />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <DetailRow
            icon={Calendar}
            value={`${service.appointmentsThisMonth} citas`}
            label="Este mes"
          />
          <DetailRow
            icon={BarChart2}
            value={`${service.appointmentsTotal} citas`}
            label="En total"
          />
        </View>
        <MetadataSection
          title="Información del Sistema"
          items={[
            { label: 'Fecha de Creación', value: service.createdAt },
            { label: 'Última Actualización', value: service.updatedAt },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
