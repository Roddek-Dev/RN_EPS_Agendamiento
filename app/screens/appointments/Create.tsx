import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, User, UserCheck, Heart } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

// Estilos y componentes reutilizables
import { globalStyles, colors, spacing, borderRadius } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormActions } from '@/components/forms/FormActions';

// Hooks, Servicios y Reglas
import { useFormValidation } from '@/hooks/useFormValidation';
import { createAppointment } from '@/app/Services/AppointmentService';
import { validationRules } from '@/utils/validationRules';

// Servicios para los selectores
import { getPatients, type Patient } from '@/app/Services/PatientService';
import { getDoctors, type Doctor } from '@/app/Services/DoctorService';
import { getServices, type Service } from '@/app/Services/ServiceService';

export default function AppointmentCreateScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [loading, setLoading] = useState(false);

  // Estados para las listas de los selectores
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Estado para el selector de fecha y hora
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { getFieldProps, validateForm, getFormData, handleChange } =
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
        service_id: {}, // No es requerido
        appointment_time: validationRules.appointment_time,
      }
    );

  // Efecto para cargar los datos de los selectores al iniciar
  useEffect(() => {
    const loadDataForPickers = async () => {
      setLoading(true);
      try {
        const [patientsResult, doctorsResult, servicesResult] =
          await Promise.all([getPatients(), getDoctors(), getServices()]);

        if (patientsResult.success) setPatients(patientsResult.data);
        if (doctorsResult.success) setDoctors(doctorsResult.data);
        if (servicesResult.success) setServices(servicesResult.data);
      } catch (error) {
        Alert.alert(
          'Error',
          'No se pudieron cargar los datos para los selectores.'
        );
      } finally {
        setLoading(false);
      }
    };
    loadDataForPickers();
  }, []);

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

  // --- MANEJO DEL SELECTOR DE FECHA ---
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirmDate = (date: Date) => {
    // Formateamos la fecha al formato que espera la API: "YYYY-MM-DD HH:MM:SS"
    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    handleChange('appointment_time', formattedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nueva Cita"
        subtitle="Programar una nueva cita médica"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Selector de Paciente */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Paciente *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={getFieldProps('patient_id').value}
              onValueChange={(itemValue) =>
                handleChange('patient_id', itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un paciente..." value="" />
              {patients.map((p) => (
                <Picker.Item
                  key={p.id}
                  label={p.name}
                  value={p.id.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Selector de Doctor */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Doctor *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={getFieldProps('doctor_id').value}
              onValueChange={(itemValue) =>
                handleChange('doctor_id', itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un doctor..." value="" />
              {doctors.map((d) => (
                <Picker.Item
                  key={d.id}
                  label={d.name}
                  value={d.id.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Selector de Servicio */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Servicio (Opcional)</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={getFieldProps('service_id').value}
              onValueChange={(itemValue) =>
                handleChange('service_id', itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un servicio..." value="" />
              {services.map((s) => (
                <Picker.Item
                  key={s.id}
                  label={s.name}
                  value={s.id.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Campo de Fecha y Hora con Selector */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha y Hora de la Cita *</Text>
          <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
            <Calendar color={colors.text.secondary} size={20} />
            <Text style={styles.dateButtonText}>
              {getFieldProps('appointment_time').value ||
                'Seleccionar fecha y hora'}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          locale="es_ES" // Para mostrar en español
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

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...globalStyles.label,
  },
  pickerContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
  },
  dateButton: {
    ...globalStyles.inputWithIcon,
    height: 50,
  },
  dateButtonText: {
    ...globalStyles.textInput,
    marginLeft: spacing.sm,
  },
});
