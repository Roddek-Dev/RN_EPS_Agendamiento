"use client"

import { useState } from "react"
import { ScrollView, Alert } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar, Clock, User, UserCheck } from "lucide-react-native"
import { globalStyles, colors } from "@/utils/globalStyles"
import { ProfileHeader } from "@/components/ProfileHeader"
import { FormField } from "@/components/forms/FormField"
import { FormActions } from "@/components/forms/FormActions"
import { useFormValidation } from "@/hooks/useFormValidation"

export default function AppointmentCreateScreen() {
  const [loading, setLoading] = useState(false)

  const patients = [
    { id: "1", name: "María González" },
    { id: "2", name: "Carlos Rodríguez" },
    { id: "3", name: "Ana Martínez" },
  ]

  const doctors = [
    { id: "1", name: "Dr. Juan Pérez" },
    { id: "2", name: "Dra. María González" },
    { id: "3", name: "Dr. Carlos López" },
  ]

  const services = [
    { id: "1", name: "Consulta General" },
    { id: "2", name: "Electrocardiograma" },
    { id: "3", name: "Ecocardiograma" },
  ]

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    patient_id: { value: "", rules: { required: true } },
    doctor_id: { value: "", rules: { required: true } },
    service_id: { value: "", rules: {} },
    appointment_date: {
      value: "",
      rules: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
      },
    },
    appointment_time: {
      value: "",
      rules: {
        required: true,
        pattern: /^\d{2}:\d{2}$/,
      },
    },
  })

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = getFormData()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Appointment data:", formData)
      Alert.alert("Éxito", "Cita creada correctamente")
      router.back()
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cita")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader title="Nueva Cita" subtitle="Programar cita médica" onBack={() => router.back()} />

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
          placeholder="Seleccionar servicio (opcional)"
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

        <FormActions
          onCancel={() => router.back()}
          onSave={handleSave}
          saveText="Crear Cita"
          loading={loading}
          saveButtonColor={colors.purple}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
