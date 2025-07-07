import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MessageSquare, User, UserCheck } from 'lucide-react-native';

// Estilos y componentes reutilizables
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';

// Hooks y Servicios
import { useFormValidation } from '@/hooks/useFormValidation';
import { createAppointment } from '@/app/Services/AppointmentService';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  // Estado del formulario
  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    patient_id: { value: '', rules: { required: true } },
    doctor_id: { value: '', rules: { required: true } },
    date: {
      value: '',
      rules: { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
    },
    description: { value: '', rules: { required: true } },
  });

  // --- MANEJO DEL GUARDADO ---
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
      return;
    }

    setLoading(true);
    try {
      const formData = getFormData();
      const result = await createAppointment({
        // Aseguramos que los IDs se envíen como números
        patient_id: Number(formData.patient_id),
        doctor_id: Number(formData.doctor_id),
        date: formData.date,
        description: formData.description,
        status: 'scheduled', // Estado por defecto al crear
      });

      if (result.success) {
        Alert.alert('Éxito', 'Cita creada correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo crear la cita.');
      }
    } catch (error) {
      Alert.alert('Error Inesperado', 'Ocurrió un error al intentar crear la cita.');
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
          label="Fecha"
          placeholder="YYYY-MM-DD"
          icon={<Calendar color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('date')}
        />
        <FormField
          label="Descripción (Motivo y Hora)"
          placeholder="Ej: Consulta general a las 10:00 AM"
          icon={<MessageSquare color={colors.text.secondary} size={20} />}
          required
          multiline
          {...getFieldProps('description')}
        />
        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Crear Cita"
          loading={loading}
          saveButtonColor={colors.purple}
        />
      </ScrollView>
    </SafeAreaView>
  );
}