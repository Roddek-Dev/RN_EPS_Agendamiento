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
import { getDoctorById, type Doctor } from '@/app/Services/DoctorService';
import {
  AppNavigationProp,
  DoctorStackParamList,
} from '@/app/navigation/types';

export default function DoctorDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<DoctorStackParamList, 'DoctorDetail'>>();
  const { id } = route.params;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorDetails = async () => {
      setLoading(true);
      const result = await getDoctorById(id);

      if (result.success) {
        setDoctor(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message || 'No se pudieron obtener los detalles del doctor.',
          [{ text: 'Volver', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
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
            label="ID Especialidad"
            value={String(doctor.specialty_id || 'No especificada')}
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
