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
import { UserCheck, Inbox } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import {
  getDoctors,
  deleteDoctor,
  type Doctor,
} from '@/app/Services/DoctorService';
import { AppNavigationProp } from '@/app/navigation/types';

export default function DoctorsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getDoctors();
      if (result.success) {
        setDoctors(result.data);
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los doctores.'
        );
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []); // ✅ ARREGLO DE DEPENDENCIAS VACÍO

  useFocusEffect(
    useCallback(() => {
      handleGetDoctors();
    }, [handleGetDoctors])
  );

  const handleCreate = () => navigation.navigate('DoctorCreate');

  const handleDelete = (id: number) => {
    Alert.alert(
      'Eliminar Doctor',
      '¿Estás seguro de que deseas eliminar este doctor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteDoctor(id);
            if (result.success) {
              Alert.alert('Éxito', 'Doctor eliminado correctamente.');
              setDoctors((prev) => prev.filter((d) => d.id !== id));
            } else {
              Alert.alert(
                'Error',
                result.message || 'No se pudo eliminar el doctor.'
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
      <SearchHeader placeholder="Buscar doctores..." onAdd={handleCreate} />
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay doctores registrados"
            subtitle="Crea un nuevo doctor para empezar."
            buttonText="Crear Doctor"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.name}
            subtitle={`Especialidad ID: ${item.specialty_id || 'No asignada'}`}
            icon={<UserCheck color={colors.primary} size={22} />}
            onPress={() => navigation.navigate('DoctorDetail', { id: item.id })}
            onEdit={() => navigation.navigate('DoctorEdit', { id: item.id })}
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