"use client"

import { useState } from "react"
import { ScrollView, Alert, Switch, View, Text } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Briefcase, Phone, Mail } from "lucide-react-native"
import { globalStyles, colors } from "../../../utils/globalStyles"
import { ProfileHeader } from "../../../components/ProfileHeader"
import { FormField } from "../../../components/forms/FormField"
import { FormActions } from "../../../components/forms/FormActions"
import { useFormValidation } from "../../../hooks/useFormValidation"
import { validationRules } from "../../../utils/validationRules"

export default function DoctorEditScreen() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "Dr. Juan Pérez",
      rules: validationRules.name,
    },
    specialty: {
      value: "Cardiología",
      rules: { required: true },
    },
    phone: {
      value: "+57 310 123 4567",
      rules: validationRules.phone,
    },
    email: {
      value: "juan.perez@clinica.com",
      rules: validationRules.email,
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = { ...getFormData(), isAvailable }
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Doctor data:", formData)
      Alert.alert("Éxito", "Doctor actualizado")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el doctor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Editar Doctor" subtitle={`ID: ${id}`} onBack={() => router.back()} />

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
          placeholder="Especialidad médica"
          icon={<Briefcase color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("specialty")}
        />

        <FormField
          label="Teléfono"
          placeholder="+57 310 123 4567"
          icon={<Phone color={colors.text.secondary} size={20} />}
          keyboardType="phone-pad"
          {...getFieldProps("phone")}
        />

        <FormField
          label="Correo electrónico"
          placeholder="doctor@clinica.com"
          icon={<Mail color={colors.text.secondary} size={20} />}
          keyboardType="email-address"
          required
          {...getFieldProps("email")}
        />

        <View style={globalStyles.inputContainer}>
          <View style={[globalStyles.row, { justifyContent: "space-between" }]}>
            <Text style={globalStyles.label}>Disponibilidad</Text>
            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: colors.border, true: colors.pending }}
              thumbColor={isAvailable ? colors.warning : colors.text.muted}
            />
          </View>
          <Text style={[globalStyles.caption, { marginTop: 4 }]}>
            {isAvailable ? "Doctor disponible para citas" : "Doctor no disponible"}
          </Text>
        </View>

        <FormActions
          onCancel={() => router.back()}
          onSave={handleSave}
          saveText="Guardar Cambios"
          loading={loading}
          saveButtonColor={colors.warning}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
