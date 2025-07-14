import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stethoscope, Inbox } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import {
  getServices,
  deleteService,
  type Service,
} from '@/app/Services/ServiceService';
import { AppNavigationProp } from '@/app/navigation/types';

export default function ServicesListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetServices = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getServices();
      if (result.success) {
        setServices(result.data);
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los servicios.'
        );
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []); // ✅ ARREGLO DE DEPENDENCIAS VACÍO

  useFocusEffect(
    useCallback(() => {
      handleGetServices();
    }, [handleGetServices])
  );

  const handleCreate = () => navigation.navigate('ServiceCreate');

  const handleDelete = (id: number) => {
    Alert.alert(
      'Eliminar Servicio',
      '¿Estás seguro de que deseas eliminar este servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteService(id);
            if (result.success) {
              Alert.alert('Éxito', 'Servicio eliminado correctamente.');
              setServices((prev) => prev.filter((s) => s.id !== id));
            } else {
              Alert.alert(
                'Error',
                result.message || 'No se pudo eliminar el servicio.'
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader placeholder="Buscar servicios..." onAdd={handleCreate} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay servicios registrados"
            subtitle="Crea un nuevo servicio para empezar."
            buttonText="Crear Servicio"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.name}
            subtitle={item.description || 'Sin descripción'}
            icon={<Stethoscope color={colors.primary} size={22} />}
            onPress={() =>
              navigation.navigate('ServiceDetail', { id: item.id })
            }
            onEdit={() => navigation.navigate('ServiceEdit', { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
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