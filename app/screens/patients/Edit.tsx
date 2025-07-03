"use client"

import { useState } from "react"
import { ScrollView, Alert, Switch, View, Text } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react-native"
import { globalStyles, colors, spacing } from "@/utils/globalStyles"
import { ProfileHeader } from "@/components/ProfileHeader"
import { FormField } from "@/components/forms/FormField"
import { FormActions } from "@/components/forms/FormActions"
import { useFormValidation } from "@/hooks/useFormValidation"
import { validationRules } from "@/utils/validationRules"

export default function PatientEditScreen() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [bloodType, setBloodType] = useState("O+")

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "María González",
      rules: validationRules.name,
    },
    email: {
      value: "maria.gonzalez@example.com",
      rules: validationRules.email,
    },
    phone: {
      value: "+57 300 123 4567",
      rules: validationRules.phone,
    },
    address: {
      value: "Calle 123 #45-67, Bogotá",
      rules: { required: true },
    },
    birthDate: {
      value: "1990-05-15",
      rules: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
      },
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = { ...getFormData(), bloodType, isActive }
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Patient data:", formData)
      Alert.alert("Éxito", "Paciente actualizado")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el paciente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Editar Paciente" subtitle={`ID: ${id}`} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre completo"
          placeholder="Nombre del paciente"
          icon={<User color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("name")}
        />

        <FormField
          label="Teléfono"
          placeholder="+57 300 123 4567"
          icon={<Phone color={colors.text.secondary} size={20} />}
          keyboardType="phone-pad"
          {...getFieldProps("phone")}
        />

        <FormField
          label="Correo electrónico"
          placeholder="paciente@email.com"
          icon={<Mail color={colors.text.secondary} size={20} />}
          keyboardType="email-address"
          required
          {...getFieldProps("email")}
        />

        <FormField
          label="Dirección"
          placeholder="Dirección del paciente"
          icon={<MapPin color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("address")}
        />

        <FormField
          label="Fecha de nacimiento"
          placeholder="YYYY-MM-DD"
          icon={<Calendar color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("birthDate")}
        />

        <FormField
          label="Tipo Sanguíneo"
          placeholder="Ej: O+, A-, etc."
          value={bloodType}
          onChangeText={setBloodType}
        />

        <View style={globalStyles.inputContainer}>
          <View style={[globalStyles.row, { justifyContent: "space-between" }]}>
            <Text style={globalStyles.label}>Estado</Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={isActive ? colors.successText : colors.text.muted}
            />
          </View>
          <Text style={[globalStyles.caption, { marginTop: spacing.xs }]}>
            {isActive ? "Paciente activo" : "Paciente inactivo"}
          </Text>
        </View>

        <FormActions
          onCancel={() => router.back()}
          onSave={handleSave}
          saveText="Guardar Cambios"
          loading={loading}
          saveButtonColor={colors.secondary}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
