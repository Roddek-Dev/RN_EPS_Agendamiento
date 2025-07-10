import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Briefcase } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { AppNavigationProp } from '@/app/navigation/types';
import { createDoctor } from '@/app/Services/DoctorService';

export default function DoctorCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      name: '',
      specialty_id: '',
    },
    {
      name: validationRules.name,
      specialty_id: { required: true },
    }
  );

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await createDoctor({
        name: formData.name,
        specialty_id: Number(formData.specialty_id),
      });

      if (result.success) {
        Alert.alert('Éxito', 'Doctor creado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo crear el doctor');
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar crear el doctor.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nuevo Doctor"
        subtitle="Registrar nuevo doctor"
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
          saveText="Crear Doctor"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
