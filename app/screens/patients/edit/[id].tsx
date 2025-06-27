import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
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
import { globalStyles, colors, spacing } from '../../../../utils/globalStyles';

export default function PatientEditScreen() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    birthDate: '1990-05-15',
    bloodType: 'O+',
    isActive: true,
  });

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    Alert.alert('Éxito', 'Paciente actualizado');
    router.back();
  };

  const renderInput = (
    icon: React.ReactNode,
    field: keyof typeof formData,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View style={globalStyles.inputContainer}>
      <View style={globalStyles.inputWithIcon}>
        {icon}
        <TextInput
          style={globalStyles.textInput}
          value={String(formData[field])}
          onChangeText={(text: string) =>
            setFormData({ ...formData, [field]: text })
          }
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
          <Text style={globalStyles.headerTitle}>Editar Paciente</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
          {renderInput(
            <User
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />,
            'name',
            'Nombre completo *'
          )}

          {renderInput(
            <Phone
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />,
            'phone',
            'Teléfono',
            'phone-pad'
          )}

          {renderInput(
            <Mail
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />,
            'email',
            'Correo electrónico',
            'email-address'
          )}

          {renderInput(
            <MapPin
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />,
            'address',
            'Dirección'
          )}

          {renderInput(
            <Calendar
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />,
            'birthDate',
            'Fecha de nacimiento'
          )}

          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Tipo Sanguíneo</Text>
            <TextInput
              style={globalStyles.textInput}
              value={formData.bloodType}
              onChangeText={(text: string) =>
                setFormData({ ...formData, bloodType: text })
              }
              placeholder="Ej: O+, A-, etc."
            />
          </View>

          <View
            style={[globalStyles.inputContainer, { marginTop: spacing.md }]}
          >
            <View
              style={[globalStyles.row, { justifyContent: 'space-between' }]}
            >
              <Text style={globalStyles.label}>Estado</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) =>
                  setFormData({ ...formData, isActive: value })
                }
                trackColor={{ false: colors.border, true: colors.success }}
                thumbColor={
                  formData.isActive ? colors.successText : colors.text.muted
                }
              />
            </View>
            <Text style={[globalStyles.caption, { marginTop: spacing.xs }]}>
              {formData.isActive ? 'Paciente activo' : 'Paciente inactivo'}
            </Text>
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
                Guardar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
