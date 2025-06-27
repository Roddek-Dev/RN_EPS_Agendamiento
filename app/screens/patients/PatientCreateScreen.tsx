import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardTypeOptions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  Save,
  X,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
}

export default function PatientCreateScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
  });

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Paciente creado correctamente');
    router.back();
  };

  const handleInputChange = (field: keyof FormData, text: string) => {
    setFormData({ ...formData, [field]: text });
  };

  const renderInput = (
    IconComponent: React.ComponentType<any>,
    field: keyof FormData,
    placeholder: string,
    keyboardType: KeyboardTypeOptions = 'default'
  ) => (
    <View style={globalStyles.inputContainer}>
      <View style={globalStyles.inputWithIcon}>
        <IconComponent
          color={colors.text.secondary}
          size={20}
          style={globalStyles.inputIcon}
        />
        <TextInput
          style={globalStyles.textInput}
          value={formData[field]}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={colors.text.muted}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity
          style={globalStyles.iconButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={globalStyles.flex1}>
          <Text style={globalStyles.headerTitle}>Nuevo Paciente</Text>
          <Text style={globalStyles.headerSubtitle}>
            Registrar nuevo paciente
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderInput(User, 'name', 'Nombre completo *')}
          {renderInput(Phone, 'phone', 'Teléfono', 'phone-pad')}
          {renderInput(Mail, 'email', 'Correo electrónico', 'email-address')}
          {renderInput(MapPin, 'address', 'Dirección')}
          {renderInput(
            Calendar,
            'birthDate',
            'Fecha de nacimiento (YYYY-MM-DD)'
          )}
        </View>

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
