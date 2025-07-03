import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { Save, X } from "lucide-react-native"
import { globalStyles, colors, spacing } from "../../utils/globalStyles"

interface FormActionsProps {
  onCancel: () => void
  onSave: () => void
  saveText?: string
  cancelText?: string
  loading?: boolean
  saveButtonColor?: string
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSave,
  saveText = "Guardar",
  cancelText = "Cancelar",
  loading = false,
  saveButtonColor = colors.primary,
}) => (
  <View style={globalStyles.formActions}>
    <TouchableOpacity
      style={[globalStyles.button, globalStyles.buttonOutline, globalStyles.formButton]}
      onPress={onCancel}
      disabled={loading}
    >
      <View style={globalStyles.row}>
        <X color={colors.text.secondary} size={20} />
        <Text style={[globalStyles.buttonTextOutline, { marginLeft: spacing.sm }]}>{cancelText}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={[globalStyles.button, { backgroundColor: saveButtonColor }, globalStyles.formButton]}
      onPress={onSave}
      disabled={loading}
    >
      <View style={globalStyles.row}>
        <Save color={colors.surface} size={20} />
        <Text style={[globalStyles.buttonText, { marginLeft: spacing.sm }]}>{loading ? "Guardando..." : saveText}</Text>
      </View>
    </TouchableOpacity>
  </View>
)
