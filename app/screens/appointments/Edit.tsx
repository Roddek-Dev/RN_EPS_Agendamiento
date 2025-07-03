"use client"

import { useState } from "react"
import { ScrollView, Alert } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar, Clock, User, UserCheck } from "lucide-react-native"
import { globalStyles, colors } from "@/utils/globalStyles"
import { ProfileHeader } from "@/components/ProfileHeader"
import { FormField } from "@/components/forms/FormField"
import { FormActions } from "@/components/forms/FormActions"
import { useFormValidation } from "@/hooks/useFormValidation"

export default function AppointmentEditScreen() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(false)

  // Mock data para selectores
  const patients = [{ id: "1", name: "María González" }]
  const doctors = [{ id: "1", name: "Dr. Juan Pérez" }]
  const services = [{ id: "1", name: "Consulta General" }]

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    patient_id: { value: "1", rules: { required: true } },
    doctor_id: { value: "1", rules: { required: true } },
    service_id: { value: "1", rules: {} },
    appointment_date: {
      value: "2025-06-27",
      rules: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
      },
    },
    appointment_time: {
      value: "10:00",
      rules: {
        required: true,
        pattern: /^\d{2}:\d{2}$/,
      },
    },
    reason: {
      value: "Dolor en el pecho y mareos ocasionales",
      rules: {},
    },
    notes: {
      value: "Paciente con antecedentes de hipertensión.",
      rules: {},
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      Alert.alert("Éxito", "Cita actualizada correctamente")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la cita")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Editar Cita" subtitle={`Modificando la cita ID: ${id}`} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <FormField
          label="Paciente"
          placeholder="Seleccionar paciente"
          icon={<User color={colors.text.secondary} size={20} />}
          isSelector
          required
          onPress={() => {
            /* Navegación al selector */
          }}
          {...getFieldProps("patient_id")}
          value={patients.find((p) => p.id === getFieldProps("patient_id").value)?.name || ""}
        />

        <FormField
          label="Doctor"
          placeholder="Seleccionar doctor"
          icon={<UserCheck color={colors.text.secondary} size={20} />}
          isSelector
          required
          onPress={() => {
            /* Navegación al selector */
          }}
          {...getFieldProps("doctor_id")}
          value={doctors.find((d) => d.id === getFieldProps("doctor_id").value)?.name || ""}
        />

        <FormField
          label="Servicio"
          placeholder="Seleccionar servicio"
          isSelector
          onPress={() => {
            /* Navegación al selector */
          }}
          {...getFieldProps("service_id")}
          value={services.find((s) => s.id === getFieldProps("service_id").value)?.name || ""}
        />

        <FormField
          label="Fecha"
          placeholder="YYYY-MM-DD"
          icon={<Calendar color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("appointment_date")}
        />

        <FormField
          label="Hora"
          placeholder="HH:MM"
          icon={<Clock color={colors.text.secondary} size={20} />}
          required
          {...getFieldProps("appointment_time")}
        />

        <FormField
          label="Motivo de la Cita"
          placeholder="Describa el motivo de la cita"
          multiline
          {...getFieldProps("reason")}
        />

        <FormField
          label="Notas Adicionales"
          placeholder="Notas adicionales sobre el paciente o la cita"
          multiline
          {...getFieldProps("notes")}
        />

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
