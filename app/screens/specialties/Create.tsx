import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ClipboardList } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { AppNavigationProp } from '@/app/navigation/types';
import { createSpecialty } from '@/app/Services/SpecialtyService';

export default function SpecialtyCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      name: '',
      description: '',
    },
    {
      name: validationRules.name,
    }
  );

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await createSpecialty({
        name: formData.name,
        description: formData.description || null,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Especialidad creada correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo crear la especialidad'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar crear la especialidad.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nueva Especialidad"
        subtitle="Registrar nueva especialidad"
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
          saveText="Crear Especialidad"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
