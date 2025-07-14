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
import { Stethoscope, ClipboardList, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import {
  AppNavigationProp,
  ServiceStackParamList,
} from '@/app/navigation/types';
import { getServiceById, updateService } from '@/app/Services/ServiceService';

export default function ServiceEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<ServiceStackParamList, 'ServiceEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  const { getFieldProps, validateForm, getFormData, setValues } =
    useFormValidation(
      {
        name: '',
        description: '',
        price: '',
      },
      {
        name: validationRules.name,
      }
    );

  useEffect(() => {
    const fetchServiceData = async () => {
      const result = await getServiceById(id);
      if (result.success) {
        const { name, description, price } = result.data;
        setValues({
          name: name,
          description: description || '',
          price: price ? String(price) : '',
        });
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los datos del servicio.'
        );
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchServiceData();
  }, [id, navigation, setValues]);

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updateService(id, {
        name: formData.name,
        description: formData.description || null,
        price: formData.price ? Number(formData.price) : null,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Servicio actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo actualizar el servicio.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar actualizar el servicio.'
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
        title="Editar Servicio"
        subtitle={`Editando servicio${getFieldProps('name').value ? `: ${getFieldProps('name').value}` : ''}`}
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
