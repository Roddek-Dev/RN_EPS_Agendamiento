import type React from "react"
import { View, Text } from "react-native"
import { Phone, Mail, MapPin } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface ContactInfoProps {
  phone?: string
  email?: string
  address?: string
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ phone, email, address }) => (
  <View style={globalStyles.contactInfo}>
    {phone && (
      <View style={globalStyles.contactItem}>
        <Phone color={colors.text.secondary} size={14} />
        <Text style={globalStyles.contactText}>{phone}</Text>
      </View>
    )}
    {email && (
      <View style={globalStyles.contactItem}>
        <Mail color={colors.text.secondary} size={14} />
        <Text style={globalStyles.contactText}>{email}</Text>
      </View>
    )}
    {address && (
      <View style={globalStyles.contactItem}>
        <MapPin color={colors.text.secondary} size={14} />
        <Text style={globalStyles.contactText}>{address}</Text>
      </View>
    )}
  </View>
)
