import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, FileText } from "lucide-react-native";
import { globalStyles, colors } from "@/utils/globalStyles";
import { ProfileHeader } from "@/components/ProfileHeader";
import { FormField } from "@/components/forms/FormField";
import { FormActions } from "@/components/forms/FormActions";
import { useFormValidation } from "@/hooks/useFormValidation";

export default function SpecialtyCreateScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { getFieldProps, validateForm, getFormData } = useFormValidation({
    name: {
      value: "",
      rules: { required: true, minLength: 3 },
    },
    description: {
      value: "",
      rules: {},
    },
  });

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formData = getFormData();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Specialty data:", formData);
      Alert.alert("Éxito", "Especialidad creada correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la especialidad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ProfileHeader
        title="Nueva Especialidad"
        subtitle="Registrar nueva especialidad médica"
        onBack={() => navigation.goBack()}
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

        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleSave}
          saveText="Crear Especialidad"
          loading={loading}
          saveButtonColor={colors.primary}
        />
      </ScrollView>
    </SafeAreaView>
  );
}