import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ArrowLeft, Edit } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface ProfileHeaderProps {
  title: string
  subtitle?: string
  onBack: () => void
  onEdit?: () => void
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, subtitle, onBack, onEdit }) => (
  <View style={globalStyles.header}>
    <TouchableOpacity style={globalStyles.iconButton} onPress={onBack}>
      <ArrowLeft color={colors.text.secondary} size={24} />
    </TouchableOpacity>
    <View style={globalStyles.flex1}>
      <Text style={globalStyles.title}>{title}</Text>
      {subtitle && <Text style={globalStyles.subtitle}>{subtitle}</Text>}
    </View>
    {onEdit && (
      <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={onEdit}>
        <Edit color={colors.surface} size={20} />
      </TouchableOpacity>
    )}
  </View>
)
