// Ruta: /(main)/cruds/doctors/[id].tsx

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
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  const goBack = () => router.back();
  const editDoctor = () => router.push(`/(main)/cruds/doctors/edit/${id}`);

  // Mock data - Array de doctores
  const doctors = [
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      specialty: 'Cardiología',
      experience: '10 años',
      rating: 4.8,
      appointments: 156,
      status: 'available',
      phone: '+57 301 234 5678',
      email: 'juan.perez@hospital.com',
      education: 'Universidad Nacional de Colombia',
      schedule: 'Lunes a Viernes 8:00 AM - 5:00 PM',
      avatar:
        'https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Dra. María González',
      specialty: 'Dermatología',
      experience: '8 años',
      rating: 4.9,
      appointments: 98,
      status: 'busy',
      phone: '+57 302 345 6789',
      email: 'maria.gonzalez@hospital.com',
      education: 'Universidad de los Andes',
      schedule: 'Martes a Sábado 9:00 AM - 6:00 PM',
      avatar:
        'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Dr. Carlos López',
      specialty: 'Cardiología',
      experience: '12 años',
      rating: 4.7,
      appointments: 203,
      status: 'available',
      phone: '+57 303 456 7890',
      email: 'carlos.lopez@hospital.com',
      education: 'Universidad Javeriana',
      schedule: 'Lunes a Viernes 7:00 AM - 4:00 PM',
      avatar:
        'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      name: 'Dra. Ana Martínez',
      specialty: 'Pediatría',
      experience: '6 años',
      rating: 4.6,
      appointments: 87,
      status: 'offline',
      phone: '+57 304 567 8901',
      email: 'ana.martinez@hospital.com',
      education: 'Universidad del Rosario',
      schedule: 'Lunes a Jueves 8:00 AM - 3:00 PM',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  // Encontrar el doctor específico por ID
  const doctor = doctors.find((doc) => doc.id === parseInt(id as string));

  // Si no se encuentra el doctor, mostrar mensaje de error
  if (!doctor) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TouchableOpacity style={globalStyles.iconButton} onPress={goBack}>
            <ArrowLeft color={colors.text.secondary} size={24} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={globalStyles.headerTitle}>Doctor no encontrado</Text>
          </View>
        </View>
        <View style={[globalStyles.content, globalStyles.center]}>
          <Text style={globalStyles.title}>Doctor no encontrado</Text>
          <Text style={globalStyles.caption}>
            El doctor solicitado no existe
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Componente reutilizable para las filas de detalles
  interface DetailRowProps {
    icon: React.ComponentType<{ color: string; size: number }>;
    value: string;
    color?: string;
  }

  const DetailRow: React.FC<DetailRowProps> = ({
    icon: Icon,
    value,
    color = colors.text.secondary,
  }) => (
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
            source={{ uri: doctor.avatar }}
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
