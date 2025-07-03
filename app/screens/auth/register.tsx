import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, colors } from "@/utils/globalStyles";
import { FormField } from "@/components/forms/FormField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validationRules } from "@/utils/validationRules";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "",
      rules: validationRules.name,
    },
    email: {
      value: "",
      rules: validationRules.email,
    },
    phone: {
      value: "",
      rules: validationRules.phone,
    },
    address: {
      value: "",
      rules: { required: true },
    },
    password: {
      value: "",
      rules: validationRules.password,
    },
    confirmPassword: {
      value: "",
      rules: {
        required: true,
        custom: (value: string) => {
          const formData = getFormData();
          if (value !== formData.password) {
            return "Las contraseñas no coinciden";
          }
          return null;
        },
      },
    },
  });

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const formData = getFormData();
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Register data:", formData);
      Alert.alert("Éxito", "Cuenta creada correctamente", [
        { text: "OK", onPress: () => navigation.navigate("login" as never) },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text style={globalStyles.title}>Crear Cuenta</Text>
          <Text style={globalStyles.subtitle}>Completa tus datos para registrarte</Text>
        </View>

        <View style={globalStyles.authForm}>
          <FormField
            label="Nombre completo"
            placeholder="Tu nombre completo"
            icon={<User color={colors.text.secondary} size={20} />}
            required
            {...getFieldProps("name")}
          />

          <FormField
            label="Correo electrónico"
            placeholder="tu@email.com"
            icon={<Mail color={colors.text.secondary} size={20} />}
            keyboardType="email-address"
            required
            {...getFieldProps("email")}
          />

          <FormField
            label="Teléfono"
            placeholder="+57 300 123 4567"
            icon={<Phone color={colors.text.secondary} size={20} />}
            keyboardType="phone-pad"
            {...getFieldProps("phone")}
          />

          <FormField
            label="Dirección"
            placeholder="Tu dirección"
            icon={<MapPin color={colors.text.secondary} size={20} />}
            required
            {...getFieldProps("address")}
          />

          <FormField
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            icon={<Lock color={colors.text.secondary} size={20} />}
            secureTextEntry
            required
            {...getFieldProps("password")}
          />

          <FormField
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            icon={<Lock color={colors.text.secondary} size={20} />}
            secureTextEntry
            required
            {...getFieldProps("confirmPassword")}
          />

          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonSecondary, { marginTop: 8 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>{loading ? "Creando cuenta..." : "Crear Cuenta"}</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.authLinkContainer}>
          <Text style={globalStyles.authLinkText}>
            ¿Ya tienes cuenta?{" "}
            <Text style={globalStyles.authLink} onPress={() => navigation.navigate("login" as never)}>
              Inicia sesión
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}