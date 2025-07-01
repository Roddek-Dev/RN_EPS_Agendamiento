"use client"

import { useState } from "react"
import { ScrollView, Alert } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Briefcase } from "lucide-react-native"
import { globalStyles, colors } from "../../../utils/globalStyles"
import { ProfileHeader } from "../../../components/ProfileHeader"
import { FormField } from "../../../components/forms/FormField"
import { FormActions } from "../../../components/forms/FormActions"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { validationRules } from "../../../utils/validationRules"

export default function DoctorCreateScreen() {
  const [loading, setLoading] = useState(false)

  const specialties = [
    { id: "1", name: "Cardiología" },
    { id: "2", name: "Dermatología" },
    { id: "3", name: "Neurología" },
  ]

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "",
      rules: validationRules.name,
    },
    specialty: {
      value: "",
      rules: { required: true },
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = getFormData()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Doctor data:", formData)
      Alert.alert("Éxito", "Doctor creado correctamente")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el doctor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Nuevo Doctor" subtitle="Registrar nuevo doctor" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre completo"
          placeholder="Nombre del doctor"
          icon={<User color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("name")}
        />

        <FormField
          label="Especialidad"
          placeholder="Seleccionar especialidad"
          icon={<Briefcase color={colors.text.secondary} size={20} />}
          isSelector
          required
          onPress={() => {
            /* Navegación al selector */
          }}
          {...getFieldProps("specialty")}
          value={specialties.find((s) => s.id === getFieldProps("specialty").value)?.name || ""}
        />

        <FormActions
          onCancel={() => router.back()}
          onSave={handleSave}
          saveText="Crear Doctor"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
