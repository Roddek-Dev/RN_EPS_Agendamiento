import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

// Estilos, Componentes y Tipos
import {
  globalStyles,
  colors,
  spacing,
  borderRadius,
} from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import {
  AppNavigationProp,
  AppointmentStackParamList,
} from '@/app/navigation/types';

// Servicios
import {
  getAppointmentById,
  updateAppointment,
} from '@/app/Services/AppointmentService';
import { getPatients, type Patient } from '@/app/Services/PatientService';
import { getDoctors, type Doctor } from '@/app/Services/DoctorService';
import { getServices, type Service } from '@/app/Services/ServiceService';

export default function AppointmentEditScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route =
    useRoute<RouteProp<AppointmentStackParamList, 'AppointmentEdit'>>();
  const { id } = route.params;

  const [loading, setLoading] = useState(true);

  // Estados para los selectores
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { getFieldProps, validateForm, getFormData, setValues, handleChange } =
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
        service_id: {},
        appointment_time: validationRules.appointment_time,
      }
    );

  // Cargar datos de la cita y de los selectores
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          appointmentResult,
          patientsResult,
          doctorsResult,
          servicesResult,
        ] = await Promise.all([
          getAppointmentById(id),
          getPatients(),
          getDoctors(),
          getServices(),
        ]);

        if (patientsResult.success) setPatients(patientsResult.data);
        if (doctorsResult.success) setDoctors(doctorsResult.data);
        if (servicesResult.success) setServices(servicesResult.data);

        if (appointmentResult.success) {
          const { patient_id, doctor_id, service_id, appointment_time } =
            appointmentResult.data;
          setValues({
            patient_id: String(patient_id),
            doctor_id: String(doctor_id),
            service_id: service_id ? String(service_id) : '',
            appointment_time: appointment_time,
          });
        } else {
          Alert.alert(
            'Error',
            appointmentResult.message ||
              'No se pudieron cargar los datos de la cita.'
          );
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert(
          'Error Crítico',
          'Ocurrió un problema al cargar los datos.'
        );
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, navigation, setValues]);

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

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirmDate = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    handleChange('appointment_time', formattedDate);
    hideDatePicker();
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
        title="Editar Cita"
        subtitle={`Modificando la cita ID: ${id}`}
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
              <Picker.Item label="Sin servicio asignado" value="" />
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
          locale="es_ES"
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
