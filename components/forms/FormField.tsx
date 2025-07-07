// roddek-dev/rn_eps_agendamiento/RN_EPS_Agendamiento-48feccccdc3a431b15f296d88c542ca6d04ba8e4/components/forms/FormField.tsx

'use client';

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  type KeyboardTypeOptions,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlexAlignType,
} from 'react-native';
import { Eye, EyeOff, ChevronDown } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../utils/globalStyles';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  onBlur?: () => void; // ✅ 1. AÑADIR: Se define la nueva prop onBlur.
  error?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
  onPress?: () => void;
  isSelector?: boolean;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  onBlur,
  icon,
  error,
  required = false,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  editable = true,
  onPress,
  isSelector = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = secureTextEntry;
  const actualSecureEntry = isPassword && !showPassword;

  // ✅ SOLUCIÓN: Construir un único objeto de estilo para evitar conflictos de tipo.
  const getInputStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [globalStyles.inputWithIcon];

    if (multiline) {
      // Permite la sobrescritura de 'alignItems'
      styles.push({
        minHeight: 100,
        alignItems: 'flex-start' as FlexAlignType,
      });
    }

    if (error) {
      // Combina el estilo de error
      styles.push(globalStyles.inputError);
    }

    if (disabled) {
      // Agrega estilos para el estado deshabilitado
      styles.push({ backgroundColor: colors.surfaceVariant, opacity: 0.6 });
    }

    return styles;
  };

  const renderInput = () => {
    if (isSelector) {
      return (
        <TouchableOpacity
          style={getInputStyle()}
          onPress={onPress}
          disabled={disabled}
        >
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
      );
    }

    return (
      <View style={getInputStyle()}>
        {icon && (
          <View
            style={[
              globalStyles.inputIcon,
              multiline && { marginTop: spacing.lg },
            ]}
          >
            {icon}
          </View>
        )}
        <TextInput
          style={[
            globalStyles.textInput,
            multiline && {
              height: 80,
              textAlignVertical: 'top',
              paddingTop: spacing.lg,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          keyboardType={keyboardType}
          onBlur={onBlur}
          secureTextEntry={actualSecureEntry}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          editable={editable && !disabled}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: spacing.xs }}
          >
            {showPassword ? (
              <EyeOff color={colors.text.secondary} size={20} />
            ) : (
              <Eye color={colors.text.secondary} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.label}>
        {label} {required && <Text style={{ color: colors.accent }}>*</Text>}
      </Text>
      {renderInput()}
      {error && (
        <Text
          style={[
            globalStyles.captionMuted,
            { color: colors.errorText, marginTop: spacing.xs },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
