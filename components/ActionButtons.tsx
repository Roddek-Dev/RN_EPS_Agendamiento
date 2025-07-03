import type React from "react"
import { View, TouchableOpacity } from "react-native"
import { Eye, Edit, Trash2 } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface ActionButtonsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showDelete?: boolean
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onView, onEdit, onDelete, showDelete = false }) => (
  <View style={globalStyles.listItemActions}>
    {onView && (
      <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: colors.info }]} onPress={onView}>
        <Eye color={colors.infoText} size={16} />
      </TouchableOpacity>
    )}
    {onEdit && (
      <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: colors.success }]} onPress={onEdit}>
        <Edit color={colors.successText} size={16} />
      </TouchableOpacity>
    )}
    {showDelete && onDelete && (
      <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: colors.error }]} onPress={onDelete}>
        <Trash2 color={colors.errorText} size={16} />
      </TouchableOpacity>
    )}
  </View>
)
