// Ruta: /(main)/cruds/appointments/edit/[id].tsx

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  Save,
  X,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  UserCheck,
  ClipboardList,
  ChevronDown, // 1. Importar para los selectores
} from 'lucide-react-native';
import { globalStyles, colors } from '../../../../utils/globalStyles';

export default function AppointmentEditScreen() {
  const { id } = useLocalSearchParams();
  const goBack = () => router.back();

  // Mock data y lógica del estado (sin cambios)
  const [formData, setFormData] = useState({
    patient_id: '1',
    doctor_id: '1',
    service_id: '1',
    appointment_date: '2025-06-27',
    appointment_time: '10:00',
    reason: 'Dolor en el pecho y mareos ocasionales',
    notes: 'Paciente con antecedentes de hipertensión.',
  });

  const patients = [{ id: '1', name: 'María González' }];
  const doctors = [{ id: '1', name: 'Dr. Juan Pérez' }];
  const services = [{ id: '1', name: 'Consulta General' }];

  const updateField = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));
  const handleSave = () => {
    Alert.alert('Éxito', 'Cita actualizada correctamente');
    router.back();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* 2. Cabecera Estandarizada */}
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Editar Cita</Text>
          <Text style={globalStyles.headerSubtitle}>
            Modificando la cita ID: {id}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* 3. Formulario dentro de una tarjeta para consistencia */}
        <View style={globalStyles.card}>
          {/* Selector de Paciente */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Paciente</Text>
            <TouchableOpacity style={globalStyles.input}>
              <View style={globalStyles.spaceBetween}>
                <Text style={globalStyles.textInput}>{patients[0].name}</Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Selector de Doctor */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Doctor</Text>
            <TouchableOpacity style={globalStyles.input}>
              <View style={globalStyles.spaceBetween}>
                <Text style={globalStyles.textInput}>{doctors[0].name}</Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Selector de Servicio */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Servicio</Text>
            <TouchableOpacity style={globalStyles.input}>
              <View style={globalStyles.spaceBetween}>
                <Text style={globalStyles.textInput}>{services[0].name}</Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/* 4. Inputs con icono usando el método de flexbox (más robusto) */}
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Fecha *</Text>
            <View style={globalStyles.inputWithIcon}>
              <Calendar
                color={colors.text.secondary}
                size={20}
                style={globalStyles.inputIcon}
              />
              <TextInput
                style={globalStyles.textInput}
                value={formData.appointment_date}
                onChangeText={(value) => updateField('appointment_date', value)}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Hora *</Text>
            <View style={globalStyles.inputWithIcon}>
              <Clock
                color={colors.text.secondary}
                size={20}
                style={globalStyles.inputIcon}
              />
              <TextInput
                style={globalStyles.textInput}
                value={formData.appointment_time}
                onChangeText={(value) => updateField('appointment_time', value)}
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Motivo de la Cita</Text>
            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              value={formData.reason}
              onChangeText={(value) => updateField('reason', value)}
              placeholder="Describa el motivo de la cita"
              multiline
            />
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Notas Adicionales</Text>
            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              placeholder="Notas adicionales sobre el paciente o la cita"
              multiline
            />
          </View>
        </View>

        {/* 5. Acciones de Formulario Estandarizadas */}
        <View style={globalStyles.formActions}>
          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonOutline,
              globalStyles.formButton,
            ]}
            onPress={goBack}
          >
            <X color={colors.text.secondary} size={20} />
            <Text style={globalStyles.buttonTextOutline}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.button,
              { backgroundColor: colors.warning },
              globalStyles.formButton,
            ]} // Botón "Guardar" con color de advertencia
            onPress={handleSave}
          >
            <Save color={colors.surface} size={20} />
            <Text style={globalStyles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ¡El StyleSheet local ya no es necesario!
