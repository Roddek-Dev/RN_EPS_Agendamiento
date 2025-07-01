import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit, ArrowLeft, Heart, FileText, Users, BarChart2, Calendar, Activity } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function SpecialtyDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const specialty = {
    id: Number(id),
    name: 'Cardiología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.',
    status: 'active',
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
    appointments: {
      total: 45,
      thisMonth: 12,
      pending: 3,
    }
  };

  const editSpecialty = () => {
    router.push(`/(main)/cruds/specialties/edit/${id}` as any);
  };

  // Componente reutilizable para las filas de detalles
  interface DetailRowProps {
    icon: React.ComponentType<{ color?: string; size?: number }>;
    value: string | number;
    label?: string;
    color?: string;
  }

  const DetailRow = ({ icon: Icon, value, label, color = colors.text.secondary }: DetailRowProps) => (
    <View style={[globalStyles.row, { gap: 12, alignItems: 'flex-start', marginBottom: 12 }]}>
      <Icon color={color} size={20} />
      <View>
        {label && <Text style={globalStyles.caption}>{label}</Text>}
        <Text style={[globalStyles.detailText, !label && {lineHeight: 20}]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle de Especialidad</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={editSpecialty}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={[globalStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <View style={[globalStyles.avatarLarge, { width: 100, height: 100, borderRadius: 50, marginBottom: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
            <Heart color={colors.surface} size={48} />
          </View>
          <Text style={[globalStyles.title, { fontSize: 22, textAlign: 'center' }]}>{specialty.name}</Text>
          <View style={[{ 
            backgroundColor: specialty.status === 'active' ? '#dcfce7' : '#fef3c7',
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 16
          }]}>
            <Text style={[globalStyles.caption, { 
              color: specialty.status === 'active' ? '#166534' : '#92400e',
              fontWeight: '600', fontSize: 14
            }]}>
              {specialty.status === 'active' ? 'Activa' : 'Inactiva'}
            </Text>
          </View>
          <View style={[globalStyles.row, { justifyContent: 'space-around', width: '100%' }]}>
            <View style={globalStyles.center}>
              <Users color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{specialty.doctors.length} doctores</Text>
            </View>
            <View style={globalStyles.center}>
              <BarChart2 color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{specialty.appointments.total} citas</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información General</Text>
          <DetailRow icon={FileText} value={specialty.description} label="Descripción" />
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Doctores Disponibles</Text>
          {specialty.doctors.map((doctor) => (
            <View key={doctor.id} style={[globalStyles.row, { justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }]}>
              <View>
                <Text style={globalStyles.itemTitle}>{doctor.name}</Text>
                <Text style={globalStyles.caption}>{doctor.experience} de experiencia</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Servicios Disponibles</Text>
          <View style={{ gap: 8 }}>
            {specialty.services.map((service, index) => (
              <View key={index} style={[globalStyles.row, { alignItems: 'center', gap: 8, paddingVertical: 6 }]}>
                <Activity color={colors.primary} size={16} />
                <Text style={globalStyles.detailText}>{service}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <DetailRow icon={Calendar} value={`${specialty.appointments.thisMonth} citas`} label="Este mes" />
          <DetailRow icon={BarChart2} value={`${specialty.appointments.total} citas`} label="En total" />
          <DetailRow icon={Activity} value={`${specialty.appointments.pending} citas`} label="Pendientes" />
        </View>
        
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información del Sistema</Text>
          <View style={{ gap: 8 }}>
            <View style={[globalStyles.row, { justifyContent: 'space-between', paddingVertical: 8 }]}>
              <Text style={[globalStyles.caption, { fontWeight: '500' }]}>Fecha de Creación:</Text>
              <Text style={globalStyles.detailText}>{specialty.createdAt}</Text>
            </View>
            <View style={[globalStyles.row, { justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f1f5f9' }]}>
              <Text style={[globalStyles.caption, { fontWeight: '500' }]}>Última Actualización:</Text>
              <Text style={globalStyles.detailText}>{specialty.updatedAt}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}