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
import { User, Mail } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import {
  AppNavigationProp,
  PatientStackParamList,
} from '@/app/navigation/types';
import { getPatientById, updatePatient } from '@/app/Services/PatientService';

export default function PatientEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<PatientStackParamList, 'PatientEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  const { getFieldProps, validateForm, getFormData, setValues } =
    useFormValidation(
      {
        name: '',
        email: '',
      },
      {
        name: validationRules.name,
        email: validationRules.email,
      }
    );

  useEffect(() => {
    const fetchPatientData = async () => {
      const result = await getPatientById(id);
      if (result.success) {
        const { name, email } = result.data;
        setValues({
          name: name,
          email: email || '',
        });
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los datos del paciente.'
        );
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchPatientData();
  }, [id, navigation, setValues]);

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updatePatient(id, {
        name: formData.name,
        email: formData.email || null,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Paciente actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo actualizar el paciente.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar actualizar el paciente.'
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
        title="Editar Paciente"
        subtitle={`ID: ${id}`}
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
