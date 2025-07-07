// Fichero: hooks/useFormValidation.ts

'use client';

import { useState, useCallback } from 'react';

// Interfaces
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  // ✅ Cambio clave: la función custom ahora recibe todos los valores del formulario
  custom?: (value: any, values: Record<string, any>) => string | null;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

// Función de utilidad para validar
const validate = (
  fieldName: string,
  value: any,
  rule: ValidationRule,
  allValues: Record<string, any> // ✅ Recibe todos los valores
): string | null => {
  if (
    rule.required &&
    (value === null || value === undefined || value.toString().trim() === '')
  ) {
    return 'Este campo es requerido';
  }
  if (value === null || value === undefined || value === '') return null;

  const stringValue = value.toString();

  if (rule.minLength && stringValue.length < rule.minLength) {
    return `Debe tener al menos ${rule.minLength} caracteres`;
  }
  if (rule.maxLength && stringValue.length > rule.maxLength) {
    return `No puede tener más de ${rule.maxLength} caracteres`;
  }
  if (rule.pattern && !rule.pattern.test(stringValue)) {
    if (fieldName.toLowerCase().includes('email'))
      return 'Formato de email inválido';
    return 'Formato inválido';
  }
  // ✅ Pasa todos los valores a la función custom
  if (rule.custom) {
    return rule.custom(value, allValues);
  }
  return null;
};

// El Hook
export const useFormValidation = <T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback((key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleBlur = useCallback(
    (key: keyof T) => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      const rule = validationRules[key];
      if (rule) {
        // ✅ Pasa 'values' al validar
        const error = validate(key as string, values[key], rule, values);
        setErrors((prev) => ({ ...prev, [key]: error || undefined }));
      }
    },
    [values, validationRules]
  );

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    for (const key in validationRules) {
      // ✅ Pasa 'values' al validar
      const error = validate(key, values[key], validationRules[key]!, values);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }
    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );
    return isValid;
  }, [values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
};
