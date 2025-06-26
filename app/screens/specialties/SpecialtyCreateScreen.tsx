import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, ArrowLeft } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function SpecialtyCreateScreen() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    
    // Here you would typically save to API
    Alert.alert('Éxito', 'Especialidad creada correctamente');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Nueva Especialidad</Text>
          <Text style={globalStyles.headerSubtitle}>Crear especialidad médica</Text>
        </View>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nombre *</Text>
            <TextInput
              style={globalStyles.input}
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Ingrese el nombre de la especialidad"
            />
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Descripción</Text>
            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              value={formData.description}
              onChangeText={(value) => updateField('description', value)}
              placeholder="Ingrese la descripción de la especialidad"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
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
              <Text style={[globalStyles.buttonText, { marginLeft: 8 }]}>Crear</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}