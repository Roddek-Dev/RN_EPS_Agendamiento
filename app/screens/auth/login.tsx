import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles'; // Asegúrate de importar spacing si lo usas
import { FormField } from '@/components/forms/FormField';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>(); // Tipado para evitar errores con navigate

  // ✅ 1. Hook de validación inicializado con la estructura optimizada.
  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useFormValidation(
      // Estado inicial simple
      { email: '', password: '' },
      // Reglas de validación importadas desde tu archivo central
      {
        email: validationRules.email,
        password: validationRules.password,
      }
    );

  const handleLogin = async () => {
    // Primero, valida el formulario completo
    if (!validateForm()) {
      Alert.alert(
        'Campos inválidos',
        'Por favor, revisa los datos ingresados.'
      );
      return;
    }

    setLoading(true);
    try {
      // Usa directamente los `values` del hook, que son la fuente de verdad.
      console.log('Login data:', values);

      // Simula una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Lógica de autenticación exitosa
      Alert.alert('Éxito', 'Has iniciado sesión correctamente.');

      // Aquí iría tu lógica para guardar el token y navegar a la app principal
      // Ejemplo: navigation.replace('MainAppStack');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error de inicio de sesión',
        'Credenciales inválidas. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={globalStyles.authContainer}>
          <View style={globalStyles.authHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={[globalStyles.avatarLarge, { marginBottom: 24 }]}
            />
            <Text style={globalStyles.title}>Bienvenido a EPS Salud</Text>
            <Text style={globalStyles.subtitle}>
              Inicia sesión para continuar
            </Text>
          </View>

          <View style={globalStyles.authForm}>
            {/* ✅ 2. FormField con props explícitas para validación onBlur. */}
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
              label="Contraseña"
              placeholder="Tu contraseña"
              icon={<Lock color={colors.text.secondary} size={20} />}
              secureTextEntry
              required
              value={values.password}
              onChangeText={(text) => handleChange('password', text)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
            />

            <TouchableOpacity
              style={[
                globalStyles.button,
                globalStyles.buttonPrimary,
                { marginTop: 8 },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.authLinkContainer}>
            <TouchableOpacity
              onPress={() => console.log("Navegar a 'Olvidé mi contraseña'")}
            >
              <Text style={globalStyles.buttonTextOutline}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: spacing.md }}
              onPress={() => navigation.navigate('register')}
            >
              <Text style={globalStyles.authLinkText}>
                ¿No tienes una cuenta?{' '}
                <Text style={globalStyles.authLink}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
