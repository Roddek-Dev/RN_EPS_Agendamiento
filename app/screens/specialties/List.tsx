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
import { Star, Inbox } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import {
  getSpecialties,
  deleteSpecialty,
  type Specialty,
} from '@/app/Services/SpecialtyService';
import { AppNavigationProp } from '@/app/navigation/types';

export default function SpecialtiesListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetSpecialties = useCallback(async () => {
    if (!loading) setLoading(true);
    try {
      const result = await getSpecialties();
      if (result.success) {
        setSpecialties(result.data);
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar las especialidades.'
        );
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useFocusEffect(
    useCallback(() => {
      handleGetSpecialties();
    }, [handleGetSpecialties])
  );

  const handleCreate = () => navigation.navigate('SpecialtyCreate');

  const handleDelete = (id: number) => {
    Alert.alert(
      'Eliminar Especialidad',
      '¿Estás seguro de que deseas eliminar esta especialidad?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteSpecialty(id);
            if (result.success) {
              Alert.alert('Éxito', 'Especialidad eliminada correctamente.');
              setSpecialties((prev) => prev.filter((s) => s.id !== id));
            } else {
              Alert.alert(
                'Error',
                result.message || 'No se pudo eliminar la especialidad.'
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
      <SearchHeader
        placeholder="Buscar especialidades..."
        onAdd={handleCreate}
      />
      <FlatList
        data={specialties}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay especialidades registradas"
            subtitle="Crea una nueva especialidad para empezar."
            buttonText="Crear Especialidad"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.name}
            subtitle={item.description || 'Sin descripción'}
            icon={<Star color={colors.primary} size={22} />}
            onPress={() =>
              navigation.navigate('SpecialtyDetail', { id: item.id })
            }
            onEdit={() => navigation.navigate('SpecialtyEdit', { id: item.id })}
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
