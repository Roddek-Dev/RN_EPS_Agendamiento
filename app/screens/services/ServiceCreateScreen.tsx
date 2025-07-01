import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardTypeOptions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Save, X, ArrowLeft, Tag, FileText, DollarSign } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

interface FormData {
  name: string;
  description: string;
  price: string;
}

export default function ServiceCreateScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
  });

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Servicio creado correctamente');
    router.back();
  };

  const handleInputChange = (field: keyof FormData, text: string) => {
    setFormData({ ...formData, [field]: text });
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
          value={formData[field]}
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
          <Text style={globalStyles.headerTitle}>Nuevo Servicio</Text>
          <Text style={globalStyles.headerSubtitle}>Registrar nuevo servicio médico</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderInput(Tag, 'name', 'Nombre del servicio *')}
          {renderInput(FileText, 'description', 'Descripción (opcional)', 'default', true)}
          {renderInput(DollarSign, 'price', 'Precio (COP)', 'numeric')}
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
              <Text style={[globalStyles.buttonText, { marginLeft: spacing.sm }]}>Crear</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}