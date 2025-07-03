import type React from "react"
import { View, Text } from "react-native"
import { globalStyles } from "../utils/globalStyles"

interface StatItemProps {
  icon?: React.ReactNode
  value: string | number
  label: string
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <View style={globalStyles.statItem}>
    {icon && icon}
    <Text style={globalStyles.statNumber}>{value}</Text>
    <Text style={globalStyles.statLabel}>{label}</Text>
  </View>
)
