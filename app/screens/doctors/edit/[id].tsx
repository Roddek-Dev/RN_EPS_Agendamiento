import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, User, Briefcase, Phone, Mail, Calendar, Star } from 'lucide-react-native';

export default function EditDoctorScreen() {
  const { id } = useLocalSearchParams();
  
  const [formData, setFormData] = useState({
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    experience: '10 años',
    email: 'juan.perez@clinica.com',
    phone: '+57 310 123 4567',
    rating: '4.8',
    schedule: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
    education: 'Universidad Nacional de Colombia, Especialización en Cardiología',
    isAvailable: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving doctor:', formData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Editar Doctor</Text>
          <Text style={styles.subtitle}>ID: {id}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <View style={styles.inputWithIcon}>
              <User color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Ingrese el nombre completo"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Especialidad</Text>
            <View style={styles.inputWithIcon}>
              <Briefcase color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.specialty}
                onChangeText={(value) => updateField('specialty', value)}
                placeholder="Ingrese la especialidad"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Experiencia</Text>
            <View style={styles.inputWithIcon}>
              <Briefcase color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.experience}
                onChangeText={(value) => updateField('experience', value)}
                placeholder="Ej: 5 años"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <View style={styles.inputWithIcon}>
              <Mail color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Ingrese el correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.inputWithIcon}>
              <Phone color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.phone}
                onChangeText={(value) => updateField('phone', value)}
                placeholder="Ingrese el teléfono"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Calificación</Text>
            <View style={styles.inputWithIcon}>
              <Star color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.rating}
                onChangeText={(value) => updateField('rating', value)}
                placeholder="Ej: 4.8"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Horario</Text>
            <View style={styles.inputWithIcon}>
              <Calendar color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { paddingLeft: 40 }]}
                value={formData.schedule}
                onChangeText={(value) => updateField('schedule', value)}
                placeholder="Ej: Lunes a Viernes, 8AM-5PM"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Formación Académica</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.education}
              onChangeText={(value) => updateField('education', value)}
              placeholder="Ingrese la formación académica"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Disponibilidad</Text>
              <Switch
                value={formData.isAvailable}
                onValueChange={(value) => updateField('isAvailable', value)}
                trackColor={{ false: '#e2e8f0', true: '#fef08a' }}
                thumbColor={formData.isAvailable ? '#ca8a04' : '#94a3b8'}
              />
            </View>
            <Text style={styles.helperText}>
              {formData.isAvailable ? 'El doctor está disponible' : 'El doctor no está disponible'}
            </Text>
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
    height: 100,
    paddingTop: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  helperText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    marginLeft: 4,
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