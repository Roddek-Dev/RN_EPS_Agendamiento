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
import { User, Inbox } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import {
  getPatients,
  deletePatient,
  type Patient,
} from '@/app/Services/PatientService';
import { AppNavigationProp } from '@/app/navigation/types';

export default function PatientsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetPatients = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPatients();
      if (result.success) {
        setPatients(result.data);
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los pacientes.'
        );
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []); // ✅ ARREGLO DE DEPENDENCIAS VACÍO

  useFocusEffect(
    useCallback(() => {
      handleGetPatients();
    }, [handleGetPatients])
  );

  const handleCreate = () => navigation.navigate('PatientCreate');

  const handleDelete = (id: number) => {
    Alert.alert(
      'Eliminar Paciente',
      '¿Estás seguro de que deseas eliminar este paciente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deletePatient(id);
            if (result.success) {
              Alert.alert('Éxito', 'Paciente eliminado correctamente.');
              setPatients((prev) => prev.filter((p) => p.id !== id));
            } else {
              Alert.alert(
                'Error',
                result.message || 'No se pudo eliminar el paciente.'
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
      <SearchHeader placeholder="Buscar pacientes..." onAdd={handleCreate} />
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        ListEmptyComponent={() => (
          <EmptyState
            icon={Inbox}
            title="No hay pacientes registrados"
            subtitle="Crea un nuevo paciente para empezar."
            buttonText="Crear Paciente"
            onButtonPress={handleCreate}
          />
        )}
        renderItem={({ item, index }) => {
          const itemColors = [
            colors.primary,
            colors.secondary,
            colors.warning,
            colors.purple,
            colors.accent,
          ];
          const iconColor = itemColors[index % itemColors.length];
          return (
            <ListItemCard
              title={item.name}
              subtitle={item.email || 'Sin correo electrónico'}
              iconBackgroundColor={iconColor}
              icon={<User color={colors.text.inverse} size={22} />}
              onPress={() =>
                navigation.navigate('PatientDetail', { id: item.id })
              }
              onEdit={() => navigation.navigate('PatientEdit', { id: item.id })}
              onDelete={() => handleDelete(item.id)}
            />
          );
        }}
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