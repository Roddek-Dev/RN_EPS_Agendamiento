import type React from "react"
import { View, Text } from "react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface DetailRowProps {
  icon: React.ComponentType<{ color: string; size: number; style?: any }>
  label?: string
  value: string | number
  color?: string
}

export const DetailRow: React.FC<DetailRowProps> = ({ icon: Icon, label, value, color = colors.text.secondary }) => (
  <View style={[globalStyles.row, { gap: 12, alignItems: "flex-start", marginBottom: 12 }]}>
    <Icon color={color} size={20} style={globalStyles.detailIcon} />
    <View>
      {label && <Text style={globalStyles.caption}>{label}</Text>}
      <Text style={[globalStyles.detailText, !label && { lineHeight: 20 }]}>{value}</Text>
    </View>
  </View>
)
