import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { login as loginUser } from '@/app/Services/AuthService';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { getFieldProps, validateForm, getFormData } = useFormValidation(
    {
      email: '',
      password: '',
    },
    {
      email: validationRules.email,
      password: validationRules.password,
    }
  );

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formData = getFormData();
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
      } else {
        Alert.alert('Error de Inicio de Sesión', result.message);
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
      <ProfileHeader
        title="Iniciar Sesión"
        subtitle="Bienvenido de nuevo"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
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
            <FormActions
              onCancel={() => navigation.goBack()}
              onSave={handleLogin}
              saveText="Iniciar Sesión"
              saveButtonColor={colors.primary}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    marginTop: 20,
  },
});
