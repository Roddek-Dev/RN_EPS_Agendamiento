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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { FormField } from '@/components/forms/FormField';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { loginUser } from '@/app/Services/AuthService';
import { RootStackParamList } from '@/app/navigation/types';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Tu hook de validación está perfecto.
  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useFormValidation(
      { email: '', password: '' },
      {
        email: validationRules.email,
        password: { required: true }, // Una regla simple de requerido es suficiente para el login.
      }
    );

  // --- CAMBIO CLAVE AQUÍ ---
  // 3. Reemplazamos la lógica simulada por la real.
  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Campos inválidos',
        'Por favor, revisa los datos ingresados.'
      );
      return;
    }

    setLoading(true);
    try {
      // Llamamos a la función real del AuthService.
      const result = await loginUser(values.email, values.password);

      if (result.success) {
        Alert.alert('Éxito', '¡Inicio de sesión exitoso!');
        // Navegamos al stack principal de la app y reseteamos el historial.
        navigation.reset({
          index: 0,
          routes: [{ name: 'NavigationMain' }],
        });
      } else {
        // Mostramos el mensaje de error que viene de la API.
        Alert.alert('Error de inicio de sesión', result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error Inesperado',
        'Ocurrió un problema al conectar con el servidor.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Tu JSX está perfecto, no necesita cambios.
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
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
