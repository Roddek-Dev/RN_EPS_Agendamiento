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
import { Star, ClipboardList } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { EmptyState } from '@/components/EmptyState';
import {
  getSpecialtyById,
  type Specialty,
} from '@/app/Services/SpecialtyService';
import {
  AppNavigationProp,
  SpecialtyStackParamList,
} from '@/app/navigation/types';

export default function SpecialtyDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<SpecialtyStackParamList, 'SpecialtyDetail'>>();
  const { id } = route.params;

  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecialtyDetails = async () => {
      setLoading(true);
      const result = await getSpecialtyById(id);

      if (result.success) {
        setSpecialty(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message ||
            'No se pudieron obtener los detalles de la especialidad.',
          [{ text: 'Volver', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
    };

    loadSpecialtyDetails();
  }, [id, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!specialty) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ProfileHeader
          title="Detalle de Especialidad"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon={ClipboardList}
          title="Especialidad no encontrada"
          subtitle="No se pudo cargar la información de la especialidad. Por favor, intenta de nuevo."
          buttonText="Volver a la lista"
          onButtonPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle de la Especialidad"
        subtitle={specialty.name}
        onBack={() => navigation.goBack()}
        onEdit={() =>
          navigation.navigate('SpecialtyEdit', { id: specialty.id })
        }
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>
            Información de la Especialidad
          </Text>
          <DetailRow
            icon={Star}
            label="Nombre"
            value={specialty.name}
            color={colors.primary}
          />
          <DetailRow
            icon={ClipboardList}
            label="Descripción"
            value={specialty.description || 'No especificada'}
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
