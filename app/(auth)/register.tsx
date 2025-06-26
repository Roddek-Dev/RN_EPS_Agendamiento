import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react-native';
import { globalStyles, colors } from '../../utils/globalStyles';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>Crear Cuenta</Text>
          <Text style={globalStyles.subtitle}>
            Completa tus datos para registrarte
          </Text>
        </View>

        <View style={globalStyles.authForm}>
          <View style={globalStyles.inputWithIcon}>
            <User
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Nombre completo"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
            />
          </View>
          <View style={globalStyles.inputWithIcon}>
            <Mail
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Correo electrónico"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={globalStyles.inputWithIcon}>
            <Phone
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Teléfono"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={globalStyles.inputWithIcon}>
            <MapPin
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Dirección"
              value={formData.address}
              onChangeText={(value) => updateField('address', value)}
            />
          </View>
          <View style={globalStyles.inputWithIcon}>
            <Lock
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              secureTextEntry
            />
          </View>
          <View style={globalStyles.inputWithIcon}>
            <Lock
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChangeText={(value) => updateField('confirmPassword', value)}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonSecondary,
              styles.registerButton,
            ]}
          >
            <Text style={globalStyles.buttonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.authLinkContainer}>
          <Text style={globalStyles.authLinkText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={globalStyles.authLink}>Inicia sesión</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos locales muy reducidos
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  registerButton: {
    marginTop: 8,
  },
});
