"use client"

import { useState } from "react"
import { ScrollView, Alert, View } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react-native"
import { globalStyles, colors } from "../../../utils/globalStyles"
import { ProfileHeader } from "../../../components/ProfileHeader"
import { FormField } from "../../../components/forms/FormField"
import { FormActions } from "../../../components/forms/FormActions"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { validationRules } from "../../../utils/validationRules"

export default function PatientCreateScreen() {
  const [loading, setLoading] = useState(false)

  const { getFieldProps, validateForm, getFormData, resetForm } = useFormValidation({
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
    birthDate: {
      value: "",
      rules: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        custom: (value: string) => {
          const date = new Date(value)
          const today = new Date()
          if (date > today) {
            return "La fecha no puede ser futura"
          }
          return null
        },
      },
    },
  })

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const formData = getFormData()
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Patient data:", formData)
      Alert.alert("Éxito", "Paciente creado correctamente")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el paciente")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    router.back()
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Nuevo Paciente" subtitle="Registrar nuevo paciente" onBack={handleCancel} />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.card}>
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
        </View>

        <FormActions
          onCancel={handleCancel}
          onSave={handleSave}
          saveText="Crear Paciente"
          loading={loading}
          saveButtonColor={colors.secondary}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
