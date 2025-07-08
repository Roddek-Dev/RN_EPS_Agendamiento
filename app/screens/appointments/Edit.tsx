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
import { Calendar, User, UserCheck, Heart } from 'lucide-react-native';

// Estilos y componentes reutilizables
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';

// Hooks, Servicios, Tipos y Reglas
import { useFormValidation } from '@/hooks/useFormValidation';
import {
  getAppointmentById,
  updateAppointment,
} from '@/app/Services/AppointmentService';
import {
  AppNavigationProp,
  AppointmentStackParamList,
} from '@/app/navigation/types';
import { validationRules } from '@/utils/validationRules';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<AppointmentStackParamList, 'AppointmentEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  // El estado del formulario se inicializa vacío, se llenará con useEffect
  const { getFieldProps, validateForm, getFormData, setValues } =
    useFormValidation(
      {
        patient_id: '',
        doctor_id: '',
        service_id: '',
        appointment_time: '',
      },
      {
        patient_id: validationRules.required,
        doctor_id: validationRules.required,
        service_id: {}, // Opcional
        appointment_time: validationRules.appointment_time,
      }
    );

  // --- EFECTO PARA CARGAR DATOS DE LA CITA ---
  useEffect(() => {
    const fetchAppointmentData = async () => {
      const result = await getAppointmentById(id);
      if (result.success) {
        const { patient_id, doctor_id, service_id, appointment_time } =
          result.data;
        // Usamos setValues para poblar el formulario con los datos existentes
        setValues({
          patient_id: String(patient_id),
          doctor_id: String(doctor_id),
          service_id: service_id ? String(service_id) : '',
          appointment_time: appointment_time,
        });
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudieron cargar los datos de la cita.'
        );
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchAppointmentData();
  }, [id, navigation, setValues]);

  // --- MANEJO DEL GUARDADO ---
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos requeridos.'
      );
      return;
    }

    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updateAppointment(id, {
        patient_id: Number(formData.patient_id),
        doctor_id: Number(formData.doctor_id),
        service_id: formData.service_id ? Number(formData.service_id) : null,
        appointment_time: formData.appointment_time,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Cita actualizada correctamente');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          result.message || 'No se pudo actualizar la cita.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar actualizar la cita.'
      );
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERIZADO ---
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
        title="Editar Cita"
        subtitle={`Modificando la cita ID: ${id}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="ID del Paciente"
          icon={<User color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          required
          {...getFieldProps('patient_id')}
        />
        <FormField
          label="ID del Doctor"
          icon={<UserCheck color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          required
          {...getFieldProps('doctor_id')}
        />
        <FormField
          label="ID del Servicio (Opcional)"
          icon={<Heart color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          {...getFieldProps('service_id')}
        />
        <FormField
          label="Fecha y Hora de la Cita"
          placeholder="YYYY-MM-DD HH:MM:SS"
          icon={<Calendar color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('appointment_time')}
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
