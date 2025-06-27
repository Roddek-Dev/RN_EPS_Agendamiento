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
import { Save, X, ArrowLeft, User, ChevronDown } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

export default function DoctorCreateScreen() {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
  });

  const specialties = [
    { id: '1', name: 'Cardiología' },
    { id: '2', name: 'Dermatología' },
  ];

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Doctor creado');
    router.back();
  };

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
          <Text style={globalStyles.headerTitle}>Nuevo Doctor</Text>
          <Text style={globalStyles.headerSubtitle}>
            Registrar nuevo doctor
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nombre *</Text>
            <View style={globalStyles.inputWithIcon}>
              <User
                color={colors.text.secondary}
                size={20}
                style={globalStyles.inputIcon}
              />
              <TextInput
                style={globalStyles.textInput}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Nombre completo"
              />
            </View>
          </View>

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Especialidad</Text>
            <TouchableOpacity style={globalStyles.inputWithIcon}>
              <View style={globalStyles.row}>
                <Text
                  style={[
                    globalStyles.textInput,
                    {
                      color: formData.specialty
                        ? colors.text.primary
                        : colors.text.muted,
                    },
                  ]}
                >
                  {formData.specialty || 'Seleccionar especialidad'}
                </Text>
                <ChevronDown color={colors.text.secondary} size={20} />
              </View>
            </TouchableOpacity>
          </View>
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
