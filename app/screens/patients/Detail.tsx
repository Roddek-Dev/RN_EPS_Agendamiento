import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Edit,
  Clock,
  ArrowLeft,
} from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { StatusBadge } from '@/components/StatusBadge';
import { StatItem } from '@/components/StatItem';
import {
  PatientStackParamList,
  PatientNavigationProp,
} from '@/app/navigation/types';

export default function PatientDetailScreen() {
  const navigation = useNavigation<PatientNavigationProp>();
  const route = useRoute<RouteProp<PatientStackParamList, 'Detail'>>();
  const { id } = route.params;

  const patient = {
    id: id,
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    birthDate: '1990-05-15',
    age: 33,
    bloodType: 'O+',
    status: 'active' as const,
    createdAt: '2023-01-10',
    updatedAt: '2023-12-15',
    lastAppointment: '2023-12-10',
    totalAppointments: 12,
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  };

  const DetailRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <View style={globalStyles.detailRow}>
      <Icon
        color={colors.text.secondary}
        size={20}
        style={globalStyles.detailIcon}
      />
      <View>
        <Text style={globalStyles.caption}>{label}</Text>
        <Text style={globalStyles.detailText}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity
          style={globalStyles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>{patient.name}</Text>
          <StatusBadge status={patient.status} />
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Edit', { id: id })}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.profileSection}>
          <Image
            source={{ uri: patient.avatar }}
            style={globalStyles.profileAvatar}
          />
          <View style={globalStyles.statContainer}>
            <StatItem value={patient.age} label="Años" />
            <StatItem value={patient.totalAppointments} label="Citas" />
            <StatItem value={patient.bloodType} label="Tipo Sanguíneo" />
          </View>
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Personal</Text>
          <DetailRow icon={Phone} label="Teléfono" value={patient.phone} />
          <DetailRow icon={Mail} label="Email" value={patient.email} />
          <DetailRow icon={User} label="Dirección" value={patient.address} />
          <DetailRow
            icon={Calendar}
            label="Fecha de Nacimiento"
            value={patient.birthDate}
          />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Historial Reciente</Text>
          <DetailRow
            icon={Clock}
            label="Última cita"
            value={patient.lastAppointment}
          />
          <DetailRow
            icon={Clock}
            label="Total de citas"
            value={patient.totalAppointments.toString()}
          />
        </View>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información del Sistema</Text>
          <View style={globalStyles.metadataCard}>
            <View style={globalStyles.metadataItem}>
              <Text style={globalStyles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={globalStyles.metadataValue}>
                {patient.createdAt}
              </Text>
            </View>
            <View style={globalStyles.metadataItem}>
              <Text style={globalStyles.metadataLabel}>
                Última Actualización:
              </Text>
              <Text style={globalStyles.metadataValue}>
                {patient.updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
