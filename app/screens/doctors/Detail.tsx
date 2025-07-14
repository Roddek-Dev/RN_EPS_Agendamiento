import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCheck, Briefcase, ClipboardList } from 'lucide-react-native';

import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { EmptyState } from '@/components/EmptyState';
import {
  AppNavigationProp,
  DoctorStackParamList,
} from '@/app/navigation/types';

// ✅ CAMBIO: Importar servicios y tipos necesarios
import { getDoctorById, type Doctor } from '@/app/Services/DoctorService';
import {
  getSpecialtyById,
  type Specialty,
} from '@/app/Services/SpecialtyService';

export default function DoctorDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<DoctorStackParamList, 'DoctorDetail'>>();
  const { id } = route.params;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  // ✅ CAMBIO: Estado para guardar la especialidad
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorDetails = async () => {
      setLoading(true);
      try {
        // Cargar los detalles del doctor
        const doctorResult = await getDoctorById(id);

        if (doctorResult.success) {
          setDoctor(doctorResult.data);

          // Si el doctor tiene una especialidad, cargar sus detalles
          if (doctorResult.data.specialty_id) {
            const specialtyResult = await getSpecialtyById(
              doctorResult.data.specialty_id
            );
            if (specialtyResult.success) {
              setSpecialty(specialtyResult.data);
            }
          }
        } else {
          Alert.alert(
            'Error al Cargar',
            doctorResult.message ||
              'No se pudieron obtener los detalles del doctor.',
            [{ text: 'Volver', onPress: () => navigation.goBack() }]
          );
        }
      } catch (error) {
        Alert.alert(
          'Error Crítico',
          'Ocurrió un problema al obtener los datos.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctorDetails();
  }, [id, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!doctor) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ProfileHeader
          title="Detalle de Doctor"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon={ClipboardList}
          title="Doctor no encontrado"
          subtitle="No se pudo cargar la información del doctor. Por favor, intenta de nuevo."
          buttonText="Volver a la lista"
          onButtonPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Perfil del Doctor"
        subtitle={doctor.name}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('DoctorEdit', { id: doctor.id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Principal</Text>
          <DetailRow
            icon={UserCheck}
            label="Nombre del Doctor"
            value={doctor.name}
            color={colors.primary}
          />
          <DetailRow
            icon={Briefcase}
            label="Especialidad" // ✅ CAMBIO: Label actualizado
            // ✅ CAMBIO: Mostrar el nombre de la especialidad
            value={specialty ? specialty.name : 'No especificada'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
