import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, ArrowLeft, User, Stethoscope } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const doctor = {
    id: Number(id),
    name: 'Dr. Juan Pérez',
    specialty_id: 1,
    specialty_name: 'Cardiología',
    avatar: 'https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const editDoctor = () => {
    router.push(`/(main)/cruds/doctors/edit/${id}` as any);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle de Doctor</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={editDoctor}>
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={[globalStyles.center, { marginBottom: 24 }]}>
            <Image source={{ uri: doctor.avatar }} style={globalStyles.avatarLarge} />
          </View>

          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Información Personal</Text>
            
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Nombre</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <User color={colors.text.secondary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8 }]}>{doctor.name}</Text>
                </View>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Especialidad</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <Stethoscope color={colors.primary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8, color: colors.primary, fontWeight: '600' }]}>
                    {doctor.specialty_name || 'Sin especialidad asignada'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <View style={globalStyles.statsContainer}>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>45</Text>
              <Text style={globalStyles.statLabel}>Citas Totales</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>12</Text>
              <Text style={globalStyles.statLabel}>Este Mes</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>4.8</Text>
              <Text style={globalStyles.statLabel}>Calificación</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}