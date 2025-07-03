import type React from "react"
import { View, Text } from "react-native"
import { globalStyles } from "../utils/globalStyles"

interface MetadataItem {
  label: string
  value: string
}

interface MetadataSectionProps {
  title: string
  items: MetadataItem[]
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({ title, items }) => (
  <View style={globalStyles.card}>
    <Text style={globalStyles.sectionTitle}>{title}</Text>
    <View style={globalStyles.metadataCard}>
      {items.map((item, index) => (
        <View key={index} style={globalStyles.metadataItem}>
          <Text style={globalStyles.metadataLabel}>{item.label}:</Text>
          <Text style={globalStyles.metadataValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  </View>
)
