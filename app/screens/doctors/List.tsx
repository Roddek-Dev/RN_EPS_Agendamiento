import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react'; // ✅ CAMBIO: Añadir useMemo
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCheck, Inbox } from 'lucide-react-native';

import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { EmptyState } from '@/components/EmptyState';
import { ListItemCard } from '@/components/ListItemCard';
import { AppNavigationProp } from '@/app/navigation/types';

// ✅ CAMBIO: Importar servicios y tipos de especialidades
import {
  getDoctors,
  deleteDoctor,
  type Doctor,
} from '@/app/Services/DoctorService';
import {
  getSpecialties,
  type Specialty,
} from '@/app/Services/SpecialtyService';

// ✅ CAMBIO: Crear una nueva interfaz para los datos combinados
interface DoctorWithSpecialty extends Doctor {
  specialtyName: string;
}

export default function DoctorsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]); // Estado para especialidades
  const [loading, setLoading] = useState(true);

  // ✅ CAMBIO: Cargar doctores y especialidades al mismo tiempo
  const handleGetData = useCallback(async () => {
    setLoading(true);
    try {
      const [doctorsResult, specialtiesResult] = await Promise.all([
        getDoctors(),
        getSpecialties(),
      ]);

      if (doctorsResult.success) {
        setDoctors(doctorsResult.data);
      } else {
        Alert.alert(
          'Error',
          doctorsResult.message || 'No se pudieron cargar los doctores.'
        );
      }

      if (specialtiesResult.success) {
        setSpecialties(specialtiesResult.data);
      } else {
        Alert.alert(
          'Error',
          specialtiesResult.message ||
            'No se pudieron cargar las especialidades.'
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error Crítico', 'Ocurrió un problema al obtener los datos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetData();
    }, [handleGetData])
  );

  // ✅ CAMBIO: Combinar los datos de doctores y especialidades usando useMemo
  const displayedDoctors: DoctorWithSpecialty[] = useMemo(() => {
    const specialtiesMap = new Map(specialties.map((s) => [s.id, s.name]));
    return doctors.map((doctor) => ({
      ...doctor,
      specialtyName: specialtiesMap.get(doctor.specialty_id ?? 0) || 'No asignada',
    }));
  }, [doctors, specialties]);

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
        data={displayedDoctors} // ✅ CAMBIO: Usar la lista con los datos combinados
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
              // ✅ CAMBIO: Mostrar el nombre de la especialidad en lugar del ID
              subtitle={item.specialtyName}
              iconBackgroundColor={iconColor}
              icon={<UserCheck color={colors.text.inverse} size={22} />}
              onPress={() =>
                navigation.navigate('DoctorDetail', { id: item.id })
              }
              onEdit={() => navigation.navigate('DoctorEdit', { id: item.id })}
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
