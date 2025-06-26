// login.tsx

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
// Asegúrate de que la ruta a tus estilos globales sea correcta
import { globalStyles, colors } from '../../utils/globalStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.authContainer}>
        <View style={globalStyles.authHeader}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400',
            }}
            style={[globalStyles.avatarLarge, styles.logo]} // Usamos avatarLarge y sobreescribimos el margen
          />
          <Text style={globalStyles.title}>Bienvenido a EPS Salud</Text>
          <Text style={globalStyles.subtitle}>
            Inicia sesión para continuar
          </Text>
        </View>

        <View style={globalStyles.authForm}>
          <View style={globalStyles.inputWithIcon}>
            <Mail
              color={colors.text.secondary}
              size={20}
              style={globalStyles.inputIcon}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Correo electrónico"
              // ...otros props
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
              secureTextEntry={!showPassword}
              // ...otros props
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff color={colors.text.secondary} size={20} />
              ) : (
                <Eye color={colors.text.secondary} size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              globalStyles.button,
              globalStyles.buttonPrimary,
              styles.loginButton, // Solo para el margen superior específico
            ]}
          >
            <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.authLinkContainer}>
          <Text style={globalStyles.buttonTextOutline}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Los estilos locales se reducen a casi nada
const styles = StyleSheet.create({
  logo: {
    marginBottom: 24, // Sobreescribimos el margen de avatarLarge
  },
  loginButton: {
    marginTop: 8,
  },
});
