// screens/appointments/Create.tsx

import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, User, UserCheck, Heart } from 'lucide-react-native';

// Estilos y componentes reutilizables
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';

// Hooks, Servicios y Reglas
import { useFormValidation } from '@/hooks/useFormValidation';
import { createAppointment } from '@/app/Services/AppointmentService';
import { validationRules } from '@/utils/validationRules';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  // Estado del formulario usando las reglas de validación
  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      patient_id: '',
      doctor_id: '',
      service_id: '',
      appointment_time: '',
    },
    {
      patient_id: validationRules.required,
      doctor_id: validationRules.required,
      service_id: {}, // No es requerido
      appointment_time: validationRules.appointment_time,
    }
  );

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
      const result = await createAppointment({
        patient_id: Number(formData.patient_id),
        doctor_id: Number(formData.doctor_id),
        service_id: formData.service_id ? Number(formData.service_id) : null,
        appointment_time: formData.appointment_time,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Cita creada correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo crear la cita.');
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un error al intentar crear la cita.'
      );
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERIZADO ---
  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nueva Cita"
        subtitle="Programar una nueva cita médica"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="ID del Paciente"
          placeholder="Ej: 1"
          icon={<User color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          required
          {...getFieldProps('patient_id')}
        />
        <FormField
          label="ID del Doctor"
          placeholder="Ej: 1"
          icon={<UserCheck color={colors.text.secondary} size={20} />}
          keyboardType="number-pad"
          required
          {...getFieldProps('doctor_id')}
        />
        <FormField
          label="ID del Servicio (Opcional)"
          placeholder="Ej: 1"
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
          saveText="Crear Cita"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
