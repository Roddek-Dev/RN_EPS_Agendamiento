import { useState, useEffect } from 'react';
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Briefcase } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
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

export default function DoctorEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<DoctorStackParamList, 'DoctorEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  const { getFieldProps, validateForm, getFormData, setValues } =
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
    const fetchDoctorData = async () => {
      const result = await getDoctorById(id);
      if (result.success) {
        const { name, specialty_id } = result.data;
        setValues({
          name: name,
          specialty_id: specialty_id ? String(specialty_id) : '',
        });
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los datos del doctor.'
        );
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchDoctorData();
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
        subtitle={`ID: ${id}`}
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
        <FormField
          label="ID de Especialidad"
          placeholder="ID de la especialidad"
          icon={<Briefcase color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          required
          {...getFieldProps('specialty_id')}
        />
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
});
