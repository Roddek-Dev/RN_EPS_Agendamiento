import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { AppNavigationProp } from '@/app/navigation/types';
import { createPatient } from '@/app/Services/PatientService';

export default function PatientCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      name: '',
      email: '',
    },
    {
      name: validationRules.name,
      email: validationRules.email, // Asumiendo que el email no es requerido
    }
  );

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await createPatient({
        name: formData.name,
        email: formData.email || null, // Enviar nulo si está vacío
      });

      if (result.success) {
        Alert.alert('Éxito', 'Paciente creado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo crear el paciente');
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar crear el paciente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nuevo Paciente"
        subtitle="Registrar nuevo paciente"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre completo"
          placeholder="Nombre del paciente"
          icon={<User color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />
        <FormField
          label="Correo Electrónico"
          placeholder="email@ejemplo.com"
          icon={<Mail color={colors.text.secondary} size={20} />}
          keyboardType="email-address"
          {...getFieldProps('email')}
        />
        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Crear Paciente"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
