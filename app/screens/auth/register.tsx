// Fichero: screens/auth/register.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { FormField } from '@/components/forms/FormField';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // ✅ 1. Hook inicializado con la estructura final y optimizada.
  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useFormValidation(
      // Estado inicial de los campos del formulario
      {
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
      },
      // Reglas de validación, usando tu archivo central y una regla custom
      {
        name: validationRules.name,
        email: validationRules.email,
        phone: validationRules.phone,
        address: { required: true },
        password: validationRules.password,
        confirmPassword: {
          required: true,
          custom: (value, formValues) => {
            if (value !== formValues.password) {
              return 'Las contraseñas no coinciden';
            }
            return null;
          },
        },
      }
    );

  const handleRegister = async () => {
    // Valida el formulario antes de enviarlo
    if (!validateForm()) {
      Alert.alert(
        'Formulario inválido',
        'Por favor, revisa los campos e intenta de nuevo.'
      );
      return;
    }

    setLoading(true);
    try {
      // Usa los 'values' directamente del hook
      console.log('Register data:', values);

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert('Éxito', 'Cuenta creada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('login' as never) },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo crear la cuenta, por favor intenta más tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={globalStyles.title}>Crear Cuenta</Text>
          <Text style={globalStyles.subtitle}>
            Completa tus datos para registrarte
          </Text>
        </View>

        <View style={globalStyles.authForm}>
          {/* ✅ 2. Cada FormField usa las props explícitas para validación onBlur */}
          <FormField
            label="Nombre completo"
            placeholder="Tu nombre completo"
            icon={<User color={colors.text.secondary} size={20} />}
            required
            value={values.name}
            onChangeText={(text) => handleChange('name', text)}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
          />

          <FormField
            label="Correo electrónico"
            placeholder="tu@email.com"
            icon={<Mail color={colors.text.secondary} size={20} />}
            keyboardType="email-address"
            required
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
          />

          <FormField
            label="Teléfono"
            placeholder="+57 300 123 4567"
            icon={<Phone color={colors.text.secondary} size={20} />}
            keyboardType="phone-pad"
            value={values.phone}
            onChangeText={(text) => handleChange('phone', text)}
            onBlur={() => handleBlur('phone')}
            error={touched.phone ? errors.phone : undefined}
          />

          <FormField
            label="Dirección"
            placeholder="Tu dirección"
            icon={<MapPin color={colors.text.secondary} size={20} />}
            required
            value={values.address}
            onChangeText={(text) => handleChange('address', text)}
            onBlur={() => handleBlur('address')}
            error={touched.address ? errors.address : undefined}
          />

          <FormField
            label="Contraseña"
            placeholder="Mínimo 6 caracteres, con mayúsculas y números"
            icon={<Lock color={colors.text.secondary} size={20} />}
            secureTextEntry
            required
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : undefined}
          />

          <FormField
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            icon={<Lock color={colors.text.secondary} size={20} />}
            secureTextEntry
            required
            value={values.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />

          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonSecondary,
              { marginTop: 8 },
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.authLinkContainer}>
          <Text style={globalStyles.authLinkText}>
            ¿Ya tienes cuenta?{' '}
            <Text
              style={globalStyles.authLink}
              onPress={() => navigation.navigate('login' as never)}
            >
              Inicia sesión
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
