import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardTypeOptions, Switch } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, ArrowLeft, Heart, FileText, Activity } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../../utils/globalStyles';

interface FormData {
  name: string;
  description: string;
  isActive: boolean;
}

export default function SpecialtyEditScreen() {
  const { id } = useLocalSearchParams();

  // Mock data - en una app real esto vendría de una API
  const [formData, setFormData] = useState<FormData>({
    name: 'Cardiología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.',
    isActive: true,
  });

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Especialidad actualizada correctamente');
    router.back();
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderInput = (
    IconComponent: React.ComponentType<any>,
    field: keyof FormData,
    placeholder: string,
    keyboardType: KeyboardTypeOptions = 'default',
    multiline: boolean = false
  ) => (
    <View style={globalStyles.inputContainer}>
      <View style={[globalStyles.inputWithIcon, multiline && { minHeight: 80, alignItems: 'flex-start' }]}>
        <IconComponent
          color={colors.text.secondary}
          size={20}
          style={[globalStyles.inputIcon, multiline && { marginTop: 12 }]}
        />
        <TextInput
          style={[globalStyles.textInput, multiline && { height: 80, textAlignVertical: 'top' }]}
          value={formData[field] as string}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={colors.text.muted}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>Editar Especialidad</Text>
          <Text style={globalStyles.headerSubtitle}>ID de la especialidad: {id}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderInput(Heart, 'name', 'Nombre de la especialidad *')}
          {renderInput(FileText, 'description', 'Descripción (opcional)', 'default', true)}
          
          <View style={globalStyles.inputContainer}>
            <View style={[globalStyles.inputWithIcon, { backgroundColor: colors.surface, borderWidth: 1, borderColor: '#e2e8f0' }]}>
              <Activity color={colors.text.secondary} size={20} style={globalStyles.inputIcon} />
              <View style={{ flex: 1 }}>
                <Text style={[globalStyles.detailText, { fontWeight: '500' }]}>Estado de la especialidad</Text>
                <Text style={[globalStyles.caption, { marginTop: 2 }]}>
                  {formData.isActive ? 'La especialidad está activa' : 'La especialidad está inactiva'}
                </Text>
              </View>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => handleInputChange('isActive', value)}
                trackColor={{ false: '#e2e8f0', true: colors.primary }}
                thumbColor={formData.isActive ? colors.surface : '#94a3b8'}
              />
            </View>
          </View>
        </View>

        <View style={globalStyles.formActions}>
          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonOutline, globalStyles.formButton]}
            onPress={() => router.back()}
          >
            <View style={globalStyles.row}>
              <X color={colors.text.secondary} size={20} />
              <Text style={[globalStyles.buttonTextOutline, { marginLeft: spacing.sm }]}>Cancelar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonPrimary, globalStyles.formButton]}
            onPress={handleSave}
          >
            <View style={globalStyles.row}>
              <Save color={colors.surface} size={20} />
              <Text style={[globalStyles.buttonText, { marginLeft: spacing.sm }]}>Guardar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
