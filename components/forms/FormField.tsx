"use client"

import React from "react"
import { View, Text, TextInput, TouchableOpacity, type KeyboardTypeOptions } from "react-native"
import { Eye, EyeOff, ChevronDown } from "lucide-react-native"
import { globalStyles, colors, spacing } from "../../utils/globalStyles"

interface FormFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  icon?: React.ReactNode
  error?: string
  required?: boolean
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  multiline?: boolean
  editable?: boolean
  onPress?: () => void
  isSelector?: boolean
  disabled?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  required = false,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  editable = true,
  onPress,
  isSelector = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  const isPassword = secureTextEntry
  const actualSecureEntry = isPassword && !showPassword

  const getInputStyle = () => {
    const style = [globalStyles.inputWithIcon]

    if (multiline) {
      style.push({ minHeight: 100, alignItems: "flex-start" })
    }

    if (isFocused && !error) {
      style.push(globalStyles.inputFocused)
    }

    if (error) {
      style.push(globalStyles.inputError)
    }

    if (disabled) {
      style.push({ backgroundColor: colors.surfaceVariant, opacity: 0.6 })
    }

    return style
  }

  const renderInput = () => {
    if (isSelector) {
      return (
        <TouchableOpacity style={getInputStyle()} onPress={onPress} disabled={disabled}>
          {icon && <View style={globalStyles.inputIcon}>{icon}</View>}
          <Text
            style={[
              globalStyles.textInput,
              {
                color: value ? colors.text.primary : colors.text.muted,
                paddingVertical: spacing.lg,
              },
            ]}
          >
            {value || placeholder}
          </Text>
          <ChevronDown color={colors.text.secondary} size={20} />
        </TouchableOpacity>
      )
    }

    return (
      <View style={getInputStyle()}>
        {icon && <View style={[globalStyles.inputIcon, multiline && { marginTop: spacing.lg }]}>{icon}</View>}
        <TextInput
          style={[
            globalStyles.textInput,
            multiline && {
              height: 80,
              textAlignVertical: "top",
              paddingTop: spacing.lg,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          keyboardType={keyboardType}
          secureTextEntry={actualSecureEntry}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          editable={editable && !disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: spacing.xs }}>
            {showPassword ? (
              <EyeOff color={colors.text.secondary} size={20} />
            ) : (
              <Eye color={colors.text.secondary} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.label}>
        {label} {required && <Text style={{ color: colors.accent }}>*</Text>}
      </Text>
      {renderInput()}
      {error && (
        <Text style={[globalStyles.captionMuted, { color: colors.errorText, marginTop: spacing.xs }]}>{error}</Text>
      )}
    </View>
  )
}
