import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tag, FileText, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { AppNavigationProp, ServiceStackParamList } from '@/app/navigation/types';

export default function ServiceEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<ServiceStackParamList, 'ServiceEdit'>>();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: 'Consulta General',
      rules: { required: true, minLength: 3 },
    },
    description: {
      value: 'Consulta médica general con revisión completa del paciente.',
      rules: {},
    },
    price: { value: '50000', rules: validationRules.price },
  });

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Service data:', formData);
      Alert.alert('Éxito', 'Servicio actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Editar Servicio"
        subtitle={`ID del servicio: ${id}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre del servicio"
          placeholder="Ej: Consulta General"
          icon={<Tag color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />
        <FormField
          label="Descripción"
          placeholder="Descripción del servicio (opcional)"
          icon={<FileText color={colors.text.secondary} size={20} />}
          multiline
          {...getFieldProps('description')}
        />
        <FormField
          label="Precio (COP)"
          placeholder="50000"
          icon={<DollarSign color={colors.text.secondary} size={20} />}
          keyboardType="numeric"
          {...getFieldProps('price')}
        />
        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Guardar Cambios"
          loading={loading}
          saveButtonColor={colors.accent}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
