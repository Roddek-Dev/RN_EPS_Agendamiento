"use client"

import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail, Lock } from "lucide-react-native"
import { router } from "expo-router"
import { globalStyles, colors } from "@/utils/globalStyles"
import { FormField } from "@/components/forms/FormField"
import { useFormValidation } from "@/hooks/useFormValidation"
import { validationRules } from "@/utils/validationRules"

export default function LoginScreen() {
  const [loading, setLoading] = useState(false)

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    email: {
      value: "",
      rules: validationRules.email,
    },
    password: {
      value: "",
      rules: { required: true, minLength: 6 },
    },
  })

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const formData = getFormData()
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí iría la lógica de autenticación real
      console.log("Login data:", formData)

      // Navegar a la app principal
      router.replace("/(main)/home")
    } catch (error) {
      Alert.alert("Error", "Credenciales inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.authContainer}>
        <View style={globalStyles.authHeader}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400",
            }}
            style={[globalStyles.avatarLarge, { marginBottom: 24 }]}
          />
          <Text style={globalStyles.title}>Bienvenido a EPS Salud</Text>
          <Text style={globalStyles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={globalStyles.authForm}>
          <FormField
            label="Correo electrónico"
            placeholder="tu@email.com"
            icon={<Mail color={colors.text.secondary} size={20} />}
            keyboardType="email-address"
            required
            {...getFieldProps("email")}
          />

          <FormField
            label="Contraseña"
            placeholder="Tu contraseña"
            icon={<Lock color={colors.text.secondary} size={20} />}
            secureTextEntry
            required
            {...getFieldProps("password")}
          />

          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonPrimary, { marginTop: 8 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>{loading ? "Iniciando sesión..." : "Iniciar Sesión"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.authLinkContainer}>
          <Text style={globalStyles.buttonTextOutline}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
