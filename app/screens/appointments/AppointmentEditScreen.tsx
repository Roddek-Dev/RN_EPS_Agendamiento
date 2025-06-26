import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, ArrowLeft, Calendar, Clock, ChevronDown } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function AppointmentEditScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const [formData, setFormData] = useState({
    patient_id: '1',
    doctor_id: '1',
    service_id: '1',
    appointment_date: '2024-01-15',
    appointment_time: '10:00',
  });

  const patients = [
    { id: '1', name: 'María González' },
    { id: '2', name: 'Carlos Rodríguez' },
    { id: '3', name: 'Ana Martínez' },
  ];

  const doctors = [
    { id: '1', name: 'Dr. Juan Pérez' },
    { id: '2', name: 'Dra. María González' },
    { id: '3', name: 'Dr. Carlos López' },
  ];

  const services = [
    { id: '1', name: 'Consulta General' },
    { id: '2', name: 'Electrocardiograma' },
    { id: '3', name: 'Ecocardiograma' },
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.patient_id || !formData.doctor_id || !formData.appointment_date || !formData.appointment_time) {
      Alert.alert('Error', 'Paciente, doctor, fecha y hora son requeridos');
      return;
    }
    
    // Here you would typically save to API
    Alert.alert('Éxito', 'Cita actualizada correctamente');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  const getSelectedName = (id: string, list: any[]) => {
    const item = list.find(item => item.id === id);
    return item ? item.name : 'Seleccionar';
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Editar Cita</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Paciente *</Text>
            <TouchableOpacity style={globalStyles.inputWithIcon}>
              <View style={globalStyles.row}>
                <Text style={[globalStyles.textInput, { color: formData.patient_id ? colors.text.primary : colors.text.muted }]}>
                  {getSelectedName(formData.patient_id, patients)}
                </Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Doctor *</Text>
            <TouchableOpacity style={globalStyles.inputWithIcon}>
              <View style={globalStyles.row}>
                <Text style={[globalStyles.textInput, { color: formData.doctor_id ? colors.text.primary : colors.text.muted }]}>
                  {getSelectedName(formData.doctor_id, doctors)}
                </Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Servicio</Text>
            <TouchableOpacity style={globalStyles.inputWithIcon}>
              <View style={globalStyles.row}>
                <Text style={[globalStyles.textInput, { color: formData.service_id ? colors.text.primary : colors.text.muted }]}>
                  {formData.service_id ? getSelectedName(formData.service_id, services) : 'Sin servicio específico'}
                </Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Fecha *</Text>
            <View style={globalStyles.inputWithIcon}>
              <Calendar color={colors.text.secondary} size={20} style={globalStyles.inputIcon} />
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
              <Clock color={colors.text.secondary} size={20} style={globalStyles.inputIcon} />
              <TextInput
                style={globalStyles.textInput}
                value={formData.appointment_time}
                onChangeText={(value) => updateField('appointment_time', value)}
                placeholder="HH:MM"
              />
            </View>
          </View>
        </View>

        <View style={globalStyles.formActions}>
          <TouchableOpacity 
            style={[globalStyles.button, globalStyles.buttonOutline, globalStyles.formButton]} 
            onPress={handleCancel}
          >
            <View style={globalStyles.row}>
              <X color={colors.text.secondary} size={20} />
              <Text style={[globalStyles.buttonTextOutline, { marginLeft: 8 }]}>Cancelar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[globalStyles.button, globalStyles.buttonPrimary, globalStyles.formButton]} 
            onPress={handleSave}
          >
            <View style={globalStyles.row}>
              <Save color={colors.surface} size={20} />
              <Text style={[globalStyles.buttonText, { marginLeft: 8 }]}>Guardar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}