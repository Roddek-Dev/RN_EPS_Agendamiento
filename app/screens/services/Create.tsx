import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tag, FileText, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { ServiceNavigationProp } from '@/app/navigation/types';

export default function ServiceCreateScreen() {
  const navigation = useNavigation<ServiceNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: { value: '', rules: { required: true, minLength: 3 } },
    description: { value: '', rules: {} },
    price: { value: '', rules: validationRules.price },
  });

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Service data:', formData);
      Alert.alert('Éxito', 'Servicio creado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nuevo Servicio"
        subtitle="Registrar nuevo servicio médico"
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
          saveText="Crear Servicio"
          loading={loading}
          saveButtonColor={colors.accent}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
