import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  KeyboardTypeOptions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  Save,
  X,
  ArrowLeft,
  User,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Star,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../../utils/globalStyles';

interface FormData {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  isAvailable: boolean;
}

export default function DoctorEditScreen() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    phone: '+57 310 123 4567',
    email: 'juan.perez@clinica.com',
    isAvailable: true,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Doctor actualizado');
    router.back();
  };

  const renderInput = (
    IconComponent: any,
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
          value={formData[field]?.toString() || ''}
          onChangeText={(text) => updateField(field, text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
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
          <Text style={globalStyles.headerTitle}>Editar Doctor</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderInput(User, 'name', 'Nombre completo')}

          {renderInput(Briefcase, 'specialty', 'Especialidad')}

          {renderInput(Phone, 'phone', 'Teléfono', 'phone-pad')}

          {renderInput(Mail, 'email', 'Correo electrónico', 'email-address')}

          <View style={globalStyles.inputContainer}>
            <View
              style={[globalStyles.row, { justifyContent: 'space-between' }]}
            >
              <Text style={globalStyles.label}>Disponibilidad</Text>
              <Switch
                value={formData.isAvailable}
                onValueChange={(value) => updateField('isAvailable', value)}
                trackColor={{ false: colors.border, true: colors.pending }}
                thumbColor={
                  formData.isAvailable ? colors.warning : colors.text.muted
                }
              />
            </View>
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
              { backgroundColor: colors.warning },
              globalStyles.formButton,
            ]}
            onPress={handleSave}
          >
            <View style={globalStyles.row}>
              <Save color={colors.surface} size={20} />
              <Text
                style={[globalStyles.buttonText, { marginLeft: spacing.sm }]}
              >
                Guardar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
