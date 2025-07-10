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
import { User, Mail, ClipboardList } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { EmptyState } from '@/components/EmptyState';
import { getPatientById, type Patient } from '@/app/Services/PatientService';
import {
  AppNavigationProp,
  PatientStackParamList,
} from '@/app/navigation/types';

export default function PatientDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<PatientStackParamList, 'PatientDetail'>>();
  const { id } = route.params;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatientDetails = async () => {
      setLoading(true);
      const result = await getPatientById(id);

      if (result.success) {
        setPatient(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message || 'No se pudieron obtener los detalles del paciente.',
          [{ text: 'Volver', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
    };

    loadPatientDetails();
  }, [id, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!patient) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ProfileHeader
          title="Detalle de Paciente"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon={ClipboardList}
          title="Paciente no encontrado"
          subtitle="No se pudo cargar la información del paciente. Por favor, intenta de nuevo."
          buttonText="Volver a la lista"
          onButtonPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Perfil del Paciente"
        subtitle={patient.name}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('PatientEdit', { id: patient.id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información Principal</Text>
          <DetailRow
            icon={User}
            label="Nombre del Paciente"
            value={patient.name}
            color={colors.primary}
          />
          <DetailRow
            icon={Mail}
            label="Correo Electrónico"
            value={patient.email || 'No especificado'}
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
