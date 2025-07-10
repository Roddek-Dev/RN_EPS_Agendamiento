import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stethoscope, ClipboardList, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { AppNavigationProp } from '@/app/navigation/types';
import { createService } from '@/app/Services/ServiceService';

export default function ServiceCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      name: '',
      description: '',
      price: '',
    },
    {
      name: validationRules.name,
      // Description y price no son requeridos según tu BD
    }
  );

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await createService({
        name: formData.name,
        description: formData.description || null,
        price: formData.price ? Number(formData.price) : null,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Servicio creado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo crear el servicio');
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar crear el servicio.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nuevo Servicio"
        subtitle="Registrar nuevo servicio"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre del servicio"
          placeholder="Nombre del servicio"
          icon={<Stethoscope color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />
        <FormField
          label="Descripción"
          placeholder="Descripción del servicio"
          icon={<ClipboardList color={colors.text.secondary} size={20} />}
          multiline
          {...getFieldProps('description')}
        />
        <FormField
          label="Precio"
          placeholder="0.00"
          icon={<DollarSign color={colors.text.secondary} size={20} />}
          keyboardType="numeric"
          {...getFieldProps('price')}
        />
        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Crear Servicio"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
