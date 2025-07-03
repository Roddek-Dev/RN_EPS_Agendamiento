import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Plus } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface EmptyStateProps {
  icon: React.ComponentType<{ color: string; size: number }>
  title: string
  subtitle: string
  buttonText?: string
  onButtonPress?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, subtitle, buttonText, onButtonPress }) => (
  <View style={globalStyles.emptyState}>
    <Icon color={colors.text.secondary} size={48} />
    <Text style={globalStyles.emptyStateText}>{title}</Text>
    <Text style={globalStyles.emptyStateSubtext}>{subtitle}</Text>
    {buttonText && onButtonPress && (
      <TouchableOpacity
        style={[globalStyles.button, globalStyles.buttonPrimary, { marginTop: 20 }]}
        onPress={onButtonPress}
      >
        <Plus color={colors.surface} size={20} />
        <Text style={globalStyles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    )}
  </View>
)
