import type React from "react"
import { View, Text } from "react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface StatusBadgeProps {
  status: "active" | "inactive" | "confirmed" | "pending" | "cancelled" | "completed" | "available" | "busy" | "offline"
  customText?: string
  size?: "small" | "medium" | "large"
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, customText, size = "medium" }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
      case "available":
        return {
          backgroundColor: colors.success,
          textColor: colors.successText,
          borderColor: colors.successBorder,
          text: customText || (status === "active" ? "Activo" : status === "confirmed" ? "Confirmada" : "Disponible"),
        }
      case "pending":
      case "busy":
        return {
          backgroundColor: colors.pending,
          textColor: colors.pendingText,
          borderColor: colors.pendingBorder,
          text: customText || (status === "pending" ? "Pendiente" : "Ocupado"),
        }
      case "inactive":
      case "cancelled":
      case "offline":
        return {
          backgroundColor: colors.error,
          textColor: colors.errorText,
          borderColor: colors.errorBorder,
          text:
            customText || (status === "inactive" ? "Inactivo" : status === "cancelled" ? "Cancelada" : "Desconectado"),
        }
      case "completed":
        return {
          backgroundColor: colors.info,
          textColor: colors.infoText,
          borderColor: colors.infoBorder,
          text: customText || "Completada",
        }
      default:
        return {
          backgroundColor: colors.surfaceVariant,
          textColor: colors.text.secondary,
          borderColor: colors.border,
          text: customText || "Desconocido",
        }
    }
  }

  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: 8,
          paddingVertical: 2,
          fontSize: 10,
        }
      case "large":
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 14,
        }
      default:
        return {
          paddingHorizontal: 12,
          paddingVertical: 4,
          fontSize: 12,
        }
    }
  }

  const config = getStatusConfig(status)
  const sizeStyles = getSizeStyles(size)

  return (
    <View
      style={[
        globalStyles.statusBadge,
        {
          backgroundColor: config.backgroundColor,
          borderWidth: 1,
          borderColor: config.borderColor,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
      ]}
    >
      <Text
        style={[
          globalStyles.statusText,
          {
            color: config.textColor,
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {config.text}
      </Text>
    </View>
  )
}
