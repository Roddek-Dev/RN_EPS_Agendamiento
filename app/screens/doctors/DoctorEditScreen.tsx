import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, ArrowLeft, User, ChevronDown } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function DoctorEditScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const [formData, setFormData] = useState({
    name: 'Dr. Juan Pérez',
    specialty_id: '1',
  });

  const specialties = [
    { id: '1', name: 'Cardiología' },
    { id: '2', name: 'Dermatología' },
    { id: '3', name: 'Neurología' },
    { id: '4', name: 'Pediatría' },
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    
    // Here you would typically save to API
    Alert.alert('Éxito', 'Doctor actualizado correctamente');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  const getSelectedSpecialtyName = () => {
    const specialty = specialties.find(s => s.id === formData.specialty_id);
    return specialty ? specialty.name : 'Seleccionar especialidad';
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Editar Doctor</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nombre *</Text>
            <View style={globalStyles.inputWithIcon}>
              <User color={colors.text.secondary} size={20} style={globalStyles.inputIcon} />
              <TextInput
                style={globalStyles.textInput}
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Ingrese el nombre completo"
              />
            </View>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Especialidad</Text>
            <TouchableOpacity style={globalStyles.inputWithIcon}>
              <View style={globalStyles.row}>
                <Text style={[globalStyles.textInput, { color: formData.specialty_id ? colors.text.primary : colors.text.muted }]}>
                  {getSelectedSpecialtyName()}
                </Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: colors.text.muted, marginTop: 4, marginLeft: 4 }}>
              Toque para seleccionar una especialidad
            </Text>
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