import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

import {
  globalStyles,
  colors,
  spacing,
  borderRadius,
} from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import {
  AppNavigationProp,
  DoctorStackParamList,
} from '@/app/navigation/types';
import { getDoctorById, updateDoctor } from '@/app/Services/DoctorService';
import {
  getSpecialties,
  type Specialty,
} from '@/app/Services/SpecialtyService';

export default function DoctorEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<DoctorStackParamList, 'DoctorEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const { getFieldProps, validateForm, getFormData, setValues, handleChange } =
    useFormValidation(
      {
        name: '',
        specialty_id: '',
      },
      {
        name: validationRules.name,
        specialty_id: { required: true },
      }
    );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [doctorResult, specialtiesResult] = await Promise.all([
          getDoctorById(id),
          getSpecialties(),
        ]);

        if (specialtiesResult.success) {
          setSpecialties(specialtiesResult.data);
        }

        if (doctorResult.success) {
          const { name, specialty_id } = doctorResult.data;
          setValues({
            name: name,
            specialty_id: specialty_id ? String(specialty_id) : '',
          });
        } else {
          Alert.alert(
            'Error',
            doctorResult.message ||
              'No se pudieron cargar los datos del doctor.'
          );
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert(
          'Error Crítico',
          'Ocurrió un problema al cargar los datos.'
        );
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, navigation, setValues]);

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updateDoctor(id, {
        name: formData.name,
        specialty_id: Number(formData.specialty_id),
      });

      if (result.success) {
        Alert.alert('Éxito', 'Doctor actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo actualizar el doctor.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar actualizar el doctor.'
      );
    } finally {
      setLoading(false);
    }
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
      <ProfileHeader
        title="Editar Doctor"
        subtitle={`Editando doctor${getFieldProps('name').value ? `: ${getFieldProps('name').value}` : ''}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre completo"
          placeholder="Nombre del doctor"
          icon={<User color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Especialidad *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={getFieldProps('specialty_id').value}
              onValueChange={(itemValue) =>
                handleChange('specialty_id', itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Seleccione una especialidad..." value="" />
              {specialties.map((specialty) => (
                <Picker.Item
                  key={specialty.id}
                  label={specialty.name}
                  value={specialty.id.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Guardar Cambios"
          loading={loading}
          saveButtonColor={colors.warning}
        />
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
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...globalStyles.label,
  },
  pickerContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
  },
});
