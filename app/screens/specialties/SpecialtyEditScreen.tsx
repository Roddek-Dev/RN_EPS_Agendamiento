"use client"

import { useState } from "react"
import { ScrollView, Alert, Switch, View, Text } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Heart, FileText, Activity } from "lucide-react-native"
import { globalStyles, colors } from "../../../utils/globalStyles"
import { ProfileHeader } from "../../../components/ProfileHeader"
import { FormField } from "../../../components/forms/FormField"
import { FormActions } from "../../../components/forms/FormActions"
import { useFormValidation } from "../../../hooks/useFormValidation"

export default function SpecialtyEditScreen() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "Cardiología",
      rules: { required: true, minLength: 3 },
    },
    description: {
      value:
        "Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.",
      rules: {},
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = { ...getFormData(), isActive }
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Specialty data:", formData)
      Alert.alert("Éxito", "Especialidad actualizada correctamente")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la especialidad")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Editar Especialidad"
        subtitle={`ID de la especialidad: ${id}`}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Nombre de la especialidad"
          placeholder="Ej: Cardiología"
          icon={<Heart color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("name")}
        />

        <FormField
          label="Descripción"
          placeholder="Descripción de la especialidad (opcional)"
          icon={<FileText color={colors.text.secondary} size={20} />}
          multiline
          {...getFieldProps("description")}
        />

        <View style={globalStyles.inputContainer}>
          <View
            style={[
              globalStyles.inputWithIcon,
              { backgroundColor: colors.surface, borderWidth: 1, borderColor: "#e2e8f0" },
            ]}
          >
            <Activity color={colors.text.secondary} size={20} style={globalStyles.inputIcon} />
            <View style={{ flex: 1 }}>
              <Text style={[globalStyles.detailText, { fontWeight: "500" }]}>Estado de la especialidad</Text>
              <Text style={[globalStyles.caption, { marginTop: 2 }]}>
                {isActive ? "La especialidad está activa" : "La especialidad está inactiva"}
              </Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: "#e2e8f0", true: colors.primary }}
              thumbColor={isActive ? colors.surface : "#94a3b8"}
            />
          </View>
        </View>

        <FormActions
          onCancel={() => router.back()}
          onSave={handleSave}
          saveText="Guardar Cambios"
          loading={loading}
          saveButtonColor={colors.primary}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
