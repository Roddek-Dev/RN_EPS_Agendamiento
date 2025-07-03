import type { ValidationRule } from "../hooks/useFormValidation"

export const validationRules = {
  required: { required: true },

  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  phone: {
    pattern: /^[+]?[1-9][\d]{0,15}$/,
  },

  password: {
    required: true,
    minLength: 6,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) {
        return "Debe contener al menos una letra minúscula"
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return "Debe contener al menos una letra mayúscula"
      }
      if (!/(?=.*\d)/.test(value)) {
        return "Debe contener al menos un número"
      }
      return null
    },
  },

  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
  },

  price: {
    pattern: /^\d+(\.\d{1,2})?$/,
    custom: (value: string) => {
      const num = Number.parseFloat(value)
      if (num < 0) {
        return "El precio debe ser mayor a 0"
      }
      return null
    },
  },
} satisfies Record<string, ValidationRule>
