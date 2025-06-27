import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Briefcase, Star, Phone, Mail, Calendar, Edit, ArrowLeft } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';
import { goBack } from 'expo-router/build/global-state/routing';


export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock data
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
    createdAt: '2020-05-10',
    updatedAt: '2023-12-15',
    schedule: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    education:
      'Universidad Nacional de Colombia, Especialización en Cardiología',
  };

  const editDoctor = () => {
    router.push(`/(main)/cruds/doctors/edit/${id}` as any);
  };

  // Componente reutilizable para las filas de detalles
  interface DetailRowProps {
    icon: React.ComponentType<{ color?: string; size?: number }>;
    value: string | number;
    color?: string;
  }

  const DetailRow = ({ icon: Icon, value, color = colors.text.secondary }: DetailRowProps) => (
    <View style={[globalStyles.row, { gap: 12, marginBottom: 12 }]}>
      <Icon color={color} size={20} />
      <Text style={globalStyles.detailText}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Perfil del Doctor</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={editDoctor}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Sección de Perfil */}
        <View
          style={[
            globalStyles.card,
            { alignItems: 'center', marginBottom: 20 },
          ]}
        >
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
            }}
            style={[
              globalStyles.avatarLarge,
              { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
            ]}
          />
          <Text style={[globalStyles.title, { fontSize: 22 }]}>
            {doctor.name}
          </Text>
          <Text
            style={[
              globalStyles.caption,
              {
                color: colors.primary,
                fontWeight: '600',
                fontSize: 16,
                marginBottom: 16,
              },
            ]}
          >
            {doctor.specialty}
          </Text>

          <View
            style={[
              globalStyles.row,
              { justifyContent: 'space-around', width: '100%' },
            ]}
          >
            <View style={globalStyles.center}>
              <Star color="#fbbf24" size={24} fill="#fbbf24" />
              <Text style={globalStyles.itemTitle}>{doctor.rating}</Text>
            </View>
            <View style={globalStyles.center}>
              <Briefcase color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{doctor.experience}</Text>
            </View>
            <View style={globalStyles.center}>
              <Calendar color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{doctor.appointments}</Text>
            </View>
          </View>
        </View>

        {/* Sección de Información Profesional */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Profesional</Text>
          <DetailRow icon={Briefcase} value={doctor.education} />
          <DetailRow icon={Calendar} value={`Horario: ${doctor.schedule}`} />
        </View>

        {/* Sección de Contacto */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información de Contacto</Text>
          <DetailRow icon={Phone} value={doctor.phone} />
          <DetailRow icon={Mail} value={doctor.email} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
