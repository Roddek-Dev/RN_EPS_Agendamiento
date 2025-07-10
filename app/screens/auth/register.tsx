import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/app/navigation/types';
import { globalStyles, colors } from '@/utils/globalStyles';
import { ProfileHeader } from '@/components/ProfileHeader';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { register as registerUser } from '@/app/Services/AuthService';

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        custom: (value: string, values: any) => {
          if (!value) return 'Debes confirmar la contraseña';
          if (value !== values?.password) return 'Las contraseñas no coinciden';
          return '';
        },
      },
    }
  );

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formData = getFormData();
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      if (result.success) {
        Alert.alert('Éxito', 'Usuario registrado correctamente.');
        // Guardamos los datos en el contexto y navegamos a la app principal
          navigation.reset({
          index: 0,
          routes: [{ name: 'NavigationMain' }],
        });
      } else {
        // AQUÍ ESTÁ LA CORRECCIÓN CLAVE: mostramos el error de la API
        Alert.alert('Error de Registro', result.message);
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
        title="Crear Cuenta"
        subtitle="Regístrate para empezar"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={globalStyles.content}>
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
          placeholder="Crea una contraseña segura"
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
            <FormActions
              onCancel={() => navigation.goBack()}
              onSave={handleRegister}
              saveText="Registrarse"
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
