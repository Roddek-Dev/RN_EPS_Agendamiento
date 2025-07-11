import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { FormField } from '@/components/forms/FormField';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { register as registerUser } from '@/app/Services/AuthService';

export default function RegisterScreen() {
  const navigation = useNavigation(); // Hook para poder navegar
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    {
      name: validationRules.name,
      email: validationRules.email,
      password: validationRules.password,
      password_confirmation: {
        required: true,
        custom: (value, values) =>
          value !== values?.password ? 'Las contraseñas no coinciden' : null,
      },
    }
  );

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formData = getFormData();
      const result = await registerUser(formData);

      if (result.success) {
        // ¡CAMBIO CLAVE! Ya no hacemos login automático.
        // Mostramos una alerta y, al presionar OK, navegamos al login.
        Alert.alert(
          '¡Éxito!',
          'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
          [{ text: 'OK', onPress: () => navigation.navigate('login' as never) }]
        );
      } else {
        Alert.alert('Error de Registro', result.message || 'Ocurrió un error.');
      }
    } catch (error) {
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un problema. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>Crear una Cuenta</Text>
          <Text style={globalStyles.subtitle}>Es rápido y fácil</Text>
        </View>

        <FormField
          label="Nombre Completo"
          placeholder="Tu nombre completo"
          icon={<User color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps('name')}
        />
        <FormField
          label="Correo Electrónico"
          placeholder="email@ejemplo.com"
          icon={<Mail color={colors.text.secondary} size={20} />}
          keyboardType="email-address"
          required
          {...getFieldProps('email')}
        />
        <FormField
          label="Contraseña"
          placeholder="Debe tener al menos 6 caracteres"
          icon={<Lock color={colors.text.secondary} size={20} />}
          secureTextEntry
          required
          {...getFieldProps('password')}
        />
        <FormField
          label="Confirmar Contraseña"
          placeholder="Vuelve a escribir la contraseña"
          icon={<Lock color={colors.text.secondary} size={20} />}
          secureTextEntry
          required
          {...getFieldProps('password_confirmation')}
        />
        <View style={styles.actionsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonPrimary]}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos (sin cambios)
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  actionsContainer: {
    marginTop: spacing.xl,
  },
});
