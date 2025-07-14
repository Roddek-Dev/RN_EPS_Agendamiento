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
import { Star, ClipboardList } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import {
  AppNavigationProp,
  SpecialtyStackParamList,
} from '@/app/navigation/types';
import {
  getSpecialtyById,
  updateSpecialty,
} from '@/app/Services/SpecialtyService';

export default function SpecialtyEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<SpecialtyStackParamList, 'SpecialtyEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  const { getFieldProps, validateForm, getFormData, setValues } =
    useFormValidation(
      {
        name: '',
        description: '',
      },
      {
        name: validationRules.name,
      }
    );

  useEffect(() => {
    const fetchSpecialtyData = async () => {
      const result = await getSpecialtyById(id);
      if (result.success) {
        const { name, description } = result.data;
        setValues({
          name: name,
          description: description || '',
        });
      } else {
        Alert.alert(
          'Error',
          result.message ||
            'No se pudieron cargar los datos de la especialidad.'
        );
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchSpecialtyData();
  }, [id, navigation, setValues]);

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updateSpecialty(id, {
        name: formData.name,
        description: formData.description || null,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Especialidad actualizada correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo actualizar la especialidad.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar actualizar la especialidad.'
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
        title="Editar Especialidad"
        subtitle={`Editando especialidad${getFieldProps('name').value ? `: ${getFieldProps('name').value}` : ''}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre de la especialidad"
          placeholder="Nombre de la especialidad"
          icon={<Star color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />
        <FormField
          label="Descripción"
          placeholder="Descripción de la especialidad"
          icon={<ClipboardList color={colors.text.secondary} size={20} />}
          multiline
          {...getFieldProps('description')}
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
