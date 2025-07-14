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
import { Stethoscope, ClipboardList, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DetailRow } from '@/components/DetailRow';
import { EmptyState } from '@/components/EmptyState';
import { getServiceById, type Service } from '@/app/Services/ServiceService';
import {
  AppNavigationProp,
  ServiceStackParamList,
} from '@/app/navigation/types';

export default function ServiceDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<ServiceStackParamList, 'ServiceDetail'>>();
  const { id } = route.params;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServiceDetails = async () => {
      setLoading(true);
      const result = await getServiceById(id);

      if (result.success) {
        setService(result.data);
      } else {
        Alert.alert(
          'Error al Cargar',
          result.message || 'No se pudieron obtener los detalles del servicio.',
          [{ text: 'Volver', onPress: () => navigation.goBack() }]
        );
      }
      setLoading(false);
    };

    loadServiceDetails();
  }, [id, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ProfileHeader
          title="Detalle de Servicio"
          onBack={() => navigation.goBack()}
        />
        <EmptyState
          icon={ClipboardList}
          title="Servicio no encontrado"
          subtitle="No se pudo cargar la información del servicio. Por favor, intenta de nuevo."
          buttonText="Volver a la lista"
          onButtonPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Detalle del Servicio"
        subtitle={service.name}
        onBack={() => navigation.goBack()}
        onEdit={() => navigation.navigate('ServiceEdit', { id: service.id })}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>
            Información del Servicio
          </Text>
          <DetailRow
            icon={Stethoscope}
            label="Nombre"
            value={service.name}
            color={colors.primary}
          />
          <DetailRow
            icon={ClipboardList}
            label="Descripción"
            value={service.description || 'No especificada'}
          />
          <DetailRow
            icon={DollarSign}
            label="Precio"
            // ✅ SOLUCIÓN: Usar Number() para convertir el precio antes de formatearlo.
            value={
              service.price
                ? `$${Number(service.price).toFixed(2)}`
                : 'No especificado'
            }
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
