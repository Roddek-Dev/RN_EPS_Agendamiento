"use client"

import { useState, useCallback } from "react"

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface FormField {
  value: string
  error: string | null
  rules: ValidationRule
}

export interface FormState {
  [key: string]: FormField
}

export const useFormValidation = (initialState: { [key: string]: { value: string; rules: ValidationRule } }) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const state: FormState = {}
    Object.keys(initialState).forEach((key) => {
      state[key] = {
        value: initialState[key].value,
        error: null,
        rules: initialState[key].rules,
      }
    })
    return state
  })

  const validateField = useCallback((fieldName: string, value: string, rules: ValidationRule): string | null => {
    // Required validation
    if (rules.required && (!value || value.trim() === "")) {
      return "Este campo es requerido"
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === "") {
      return null
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `Debe tener al menos ${rules.minLength} caracteres`
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `No puede tener más de ${rules.maxLength} caracteres`
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      if (fieldName.toLowerCase().includes("email")) {
        return "Formato de email inválido"
      }
      if (fieldName.toLowerCase().includes("phone")) {
        return "Formato de teléfono inválido"
      }
      return "Formato inválido"
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }, [])

  const updateField = useCallback(
    (fieldName: string, value: string) => {
      setFormState((prev) => {
        const field = prev[fieldName]
        const error = validateField(fieldName, value, field.rules)

        return {
          ...prev,
          [fieldName]: {
            ...field,
            value,
            error,
          },
        }
      })
    },
    [validateField],
  )

  const validateForm = useCallback((): boolean => {
    let isValid = true
    const newState = { ...formState }

    Object.keys(formState).forEach((fieldName) => {
      const field = formState[fieldName]
      const error = validateField(fieldName, field.value, field.rules)

      newState[fieldName] = {
        ...field,
        error,
      }

      if (error) {
        isValid = false
      }
    })

    setFormState(newState)
    return isValid
  }, [formState, validateField])

  const getFieldProps = useCallback(
    (fieldName: string) => ({
      value: formState[fieldName]?.value || "",
      error: formState[fieldName]?.error || undefined,
      onChangeText: (text: string) => updateField(fieldName, text),
    }),
    [formState, updateField],
  )

  const resetForm = useCallback(() => {
    const resetState: FormState = {}
    Object.keys(initialState).forEach((key) => {
      resetState[key] = {
        value: initialState[key].value,
        error: null,
        rules: initialState[key].rules,
      }
    })
    setFormState(resetState)
  }, [initialState])

  const getFormData = useCallback(() => {
    const data: { [key: string]: string } = {}
    Object.keys(formState).forEach((key) => {
      data[key] = formState[key].value
    })
    return data
  }, [formState])

  const hasErrors = useCallback(() => {
    return Object.values(formState).some((field) => field.error !== null)
  }, [formState])

  return {
    formState,
    updateField,
    validateForm,
    getFieldProps,
    resetForm,
    getFormData,
    hasErrors,
  }
}
