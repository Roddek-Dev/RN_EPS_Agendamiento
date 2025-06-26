import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, User, UserCheck, Calendar, Clock, ClipboardList } from 'lucide-react-native';

export default function EditAppointmentScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data for dropdowns
  const patients = [
    { id: 1, name: 'María González' },
    { id: 2, name: 'Carlos Rodríguez' },
    { id: 3, name: 'Ana Martínez' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Juan Pérez', specialty: 'Cardiología' },
    { id: 2, name: 'Dra. Ana López', specialty: 'Dermatología' },
    { id: 3, name: 'Dr. Luis García', specialty: 'Neurología' },
  ];

  const services = [
    { id: 1, name: 'Consulta General', duration: 30 },
    { id: 2, name: 'Examen de Laboratorio', duration: 45 },
    { id: 3, name: 'Radiografía', duration: 20 },
  ];

  const [formData, setFormData] = useState({
    patient: patients[0].id,
    doctor: doctors[0].id,
    service: services[0].id,
    date: '2024-01-15',
    time: '10:00',
    status: 'confirmed',
    reason: 'Dolor en el pecho y mareos ocasionales',
    notes: 'Paciente con antecedentes de hipertensión. Tomar presión arterial.',
  });

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving appointment:', formData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const getSelectedDoctor = () => {
    return doctors.find(d => d.id === formData.doctor) || doctors[0];
  };

  const getSelectedService = () => {
    return services.find(s => s.id === formData.service) || services[0];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Editar Cita</Text>
          <Text style={styles.subtitle}>ID: {id}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Paciente</Text>
            <View style={styles.inputWithIcon}>
              <User color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={patients.find(p => p.id === formData.patient)?.name || ''}
                onChangeText={(value) => updateField('patient', value)}
                placeholder="Seleccione un paciente"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Doctor</Text>
            <View style={styles.inputWithIcon}>
              <UserCheck color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={`${getSelectedDoctor().name} - ${getSelectedDoctor().specialty}`}
                onChangeText={(value) => updateField('doctor', value)}
                placeholder="Seleccione un doctor"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Servicio</Text>
            <View style={styles.inputWithIcon}>
              <ClipboardList color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={`${getSelectedService().name} (${getSelectedService().duration} min)`}
                onChangeText={(value) => updateField('service', value)}
                placeholder="Seleccione un servicio"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Fecha</Text>
            <View style={styles.inputWithIcon}>
              <Calendar color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.date}
                onChangeText={(value) => updateField('date', value)}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Hora</Text>
            <View style={styles.inputWithIcon}>
              <Clock color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.time}
                onChangeText={(value) => updateField('time', value)}
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.inputWithIcon}>
              <UserCheck color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.status === 'confirmed' ? 'Confirmada' : 
                       formData.status === 'pending' ? 'Pendiente' : 
                       formData.status === 'cancelled' ? 'Cancelada' : 'Completada'}
                onChangeText={(value) => updateField('status', value)}
                placeholder="Estado de la cita"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Motivo de la Cita</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.reason}
              onChangeText={(value) => updateField('reason', value)}
              placeholder="Describa el motivo de la cita"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Notas Adicionales</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              placeholder="Notas adicionales sobre el paciente o la cita"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <X color="#64748b" size={20} />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#ca8a04' }]} onPress={handleSave}>
            <Save color="#ffffff" size={20} />
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  form: {
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});