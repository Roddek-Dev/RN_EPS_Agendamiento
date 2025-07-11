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
import { Mail, Lock } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { FormField } from '@/components/forms/FormField';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { login as loginUser } from '@/app/Services/AuthService';

// ¡CAMBIO CLAVE! Aceptamos onLoginSuccess como prop
export default function LoginScreen({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    { email: '', password: '' },
    {
      email: validationRules.email,
      password: { required: true },
    }
  );

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formData = getFormData();
      const result = await loginUser(formData);

      if (result.success) {
        // ¡CAMBIO CLAVE! Llamamos a la función para notificar que el login fue exitoso
        onLoginSuccess();
      } else {
        Alert.alert(
          'Error de Inicio de Sesión',
          result.message || 'Ocurrió un error.'
        );
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
          <Text style={globalStyles.title}>Bienvenido de Nuevo</Text>
          <Text style={globalStyles.subtitle}>
            Inicia sesión para continuar
          </Text>
        </View>

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
          placeholder="Tu contraseña"
          icon={<Lock color={colors.text.secondary} size={20} />}
          secureTextEntry
          required
          {...getFieldProps('password')}
        />
        <View style={styles.actionsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonPrimary]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
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
