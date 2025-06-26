import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  Save,
  X,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronDown,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

type SelectionItem = {
  id: string;
  name: string;
};

export default function AppointmentCreateScreen() {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    service_id: '',
    appointment_date: '',
    appointment_time: '',
  });

  const patients: SelectionItem[] = [
    { id: '1', name: 'María González' },
    { id: '2', name: 'Carlos Rodríguez' },
    { id: '3', name: 'Ana Martínez' },
  ];

  const doctors: SelectionItem[] = [
    { id: '1', name: 'Dr. Juan Pérez' },
    { id: '2', name: 'Dra. María González' },
    { id: '3', name: 'Dr. Carlos López' },
  ];

  const services: SelectionItem[] = [
    { id: '1', name: 'Consulta General' },
    { id: '2', name: 'Electrocardiograma' },
    { id: '3', name: 'Ecocardiograma' },
  ];

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const requiredFields: (keyof typeof formData)[] = [
      'patient_id',
      'doctor_id',
      'appointment_date',
      'appointment_time',
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Todos los campos requeridos deben ser completados');
      return;
    }

    // Aquí iría la lógica para guardar en la API
    Alert.alert('Éxito', 'Cita creada correctamente');
    router.back();
  };

  const getSelectedName = (id: string, list: SelectionItem[]) => {
    return list.find((item) => item.id === id)?.name || 'Seleccionar';
  };

  const renderSelector = (
    field: keyof typeof formData,
    label: string,
    list: SelectionItem[],
    required = true
  ) => (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.label}>
        {label} {required && '*'}
      </Text>
      <TouchableOpacity
        style={globalStyles.inputWithIcon}
        onPress={() => {
          /* Aquí iría la navegación al selector */
        }}
      >
        <View style={globalStyles.row}>
          <Text
            style={[
              globalStyles.textInput,
              {
                color: formData[field]
                  ? colors.text.primary
                  : colors.text.muted,
              },
            ]}
          >
            {getSelectedName(formData[field], list)}
          </Text>
          <ChevronDown color={colors.text.secondary} size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderInputWithIcon = (
    field: keyof typeof formData,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    required = true
  ) => (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.label}>
        {label} {required && '*'}
      </Text>
      <View style={globalStyles.inputWithIcon}>
        {icon}
        <TextInput
          style={globalStyles.textInput}
          value={formData[field]}
          onChangeText={(value) => updateField(field, value)}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <TouchableOpacity
          style={globalStyles.iconButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>Nueva Cita</Text>
          <Text style={globalStyles.headerSubtitle}>Programar cita médica</Text>
        </View>
      </View>

      {/* Formulario */}
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderSelector('patient_id', 'Paciente', patients)}
          {renderSelector('doctor_id', 'Doctor', doctors)}
          {renderSelector('service_id', 'Servicio', services, false)}

          {renderInputWithIcon(
            'appointment_date',
            'Fecha',
            'YYYY-MM-DD',
            <Calendar
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
          )}

          {renderInputWithIcon(
            'appointment_time',
            'Hora',
            'HH:MM',
            <Clock
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
          )}
        </View>

        {/* Acciones */}
        <View style={globalStyles.formActions}>
          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonOutline,
              globalStyles.formButton,
            ]}
            onPress={() => router.back()}
          >
            <View style={globalStyles.row}>
              <X color={colors.text.secondary} size={20} />
              <Text
                style={[
                  globalStyles.buttonTextOutline,
                  { marginLeft: spacing.sm },
                ]}
              >
                Cancelar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonPrimary,
              globalStyles.formButton,
            ]}
            onPress={handleSave}
          >
            <View style={globalStyles.row}>
              <Save color={colors.surface} size={20} />
              <Text
                style={[globalStyles.buttonText, { marginLeft: spacing.sm }]}
              >
                Crear
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
