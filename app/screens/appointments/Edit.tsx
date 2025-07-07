import { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MessageSquare, User, UserCheck } from 'lucide-react-native';

// Estilos y componentes reutilizables
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';

// Hooks, Servicios y Tipos
import { useFormValidation } from '@/hooks/useFormValidation';
import { getAppointments, updateAppointment } from '@/app/Services/AppointmentService';
import { AppNavigationProp, AppointmentStackParamList } from '@/app/navigation/types';

// --- COMPONENTE PRINCIPAL ---
export default function AppointmentEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<RouteProp<AppointmentStackParamList, 'AppointmentEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true); // Inicia cargando para obtener datos

  // El estado del formulario se inicializa vacío, se llenará con useEffect
  const { getFieldProps, validateForm, getFormData, updateField } = useFormValidation({
    patient_id: { value: '', rules: { required: true } },
    doctor_id: { value: '', rules: { required: true } },
    date: { value: '', rules: { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ } },
    description: { value: '', rules: { required: true } },
  });

  // --- EFECTO PARA CARGAR DATOS DE LA CITA ---
  useEffect(() => {
    const fetchAppointmentData = async () => {
      // Usamos el servicio getAppointments y filtramos por ID
      const result = await getAppointments();
      if (result.success) {
        const appointmentToEdit = result.data.find(app => app.id === id);
        if (appointmentToEdit) {
          // Llenamos el formulario con los datos existentes
          updateField('patient_id', String(appointmentToEdit.patient_id));
          updateField('doctor_id', String(appointmentToEdit.doctor_id));
          updateField('date', appointmentToEdit.date);
          updateField('description', appointmentToEdit.description);
        } else {
          Alert.alert('Error', 'No se encontró la cita para editar.');
          navigation.goBack();
        }
      } else {
        Alert.alert('Error', 'No se pudieron cargar los datos de la cita.');
        navigation.goBack();
      }
      setLoading(false);
    };

    fetchAppointmentData();
  }, [id, navigation, updateField]);

  // --- MANEJO DEL GUARDADO ---
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
      return;
    }

    setLoading(true);
    try {
      const formData = getFormData();
      const result = await updateAppointment(id, {
        patient_id: Number(formData.patient_id),
        doctor_id: Number(formData.doctor_id),
        date: formData.date,
        description: formData.description,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Cita actualizada correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'No se pudo actualizar la cita.');
      }
    } catch (error) {
      Alert.alert('Error Inesperado', 'Ocurrió un error al intentar actualizar la cita.');
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