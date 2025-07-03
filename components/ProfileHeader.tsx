import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ArrowLeft, Edit } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"
import { StatusBadge } from "./StatusBadge"

interface ProfileHeaderProps {
  title: string
  subtitle?: string
  status?: "active" | "inactive" | "available" | "busy" | "offline"
  avatar?: string
  onBack: () => void
  onEdit?: () => void
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title, subtitle, status, avatar, onBack, onEdit }) => (
  <View style={globalStyles.header}>
    <TouchableOpacity style={globalStyles.iconButton} onPress={onBack}>
      <ArrowLeft color={colors.text.secondary} size={24} />
    </TouchableOpacity>
    <View style={globalStyles.flex1}>
      <Text style={globalStyles.headerTitle}>{title}</Text>
      {subtitle && <Text style={globalStyles.headerSubtitle}>{subtitle}</Text>}
      {status && <StatusBadge status={status} />}
    </View>
    {onEdit && (
      <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={onEdit}>
        <Edit color={colors.surface} size={20} />
      </TouchableOpacity>
    )}
  </View>
)
