import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getStoredUser,
  updateProfile,
  changePassword,
  type UpdateProfileData,
  type ChangePasswordData,
} from '@/app/Services/AuthService';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validationRules } from '@/utils/validationRules';
import { FormField } from '@/components/forms/FormField';
import { FormActions } from '@/components/forms/FormActions';
import { globalStyles, colors } from '@/utils/globalStyles';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Formulario para editar perfil
  const {
    values: profileData,
    validateForm: validateProfileForm,
    getFieldProps: getProfileFieldProps,
    setValues: setProfileValues,
  } = useFormValidation<UpdateProfileData>(
    { name: '', email: '' },
    { name: validationRules.name, email: validationRules.email }
  );

  // Formulario para cambiar contraseña
  const {
    values: passwordData,
    validateForm: validatePasswordForm,
    getFieldProps: getPasswordFieldProps,
    resetForm: resetPasswordForm,
  } = useFormValidation<ChangePasswordData>(
    { current_password: '', password: '', password_confirmation: '' },
    {
      current_password: validationRules.password,
      password: validationRules.password,
      password_confirmation: {
        custom: (value: any, values: any) => {
          if (!value) return 'La confirmación es requerida.';
          if (value !== values?.password) return 'Las contraseñas no coinciden.';
          return null; // return null for valid, string for error
        }
      },
    }
  );

  useEffect(() => {
    const loadUserData = async () => {
      const user = await getStoredUser();
      if (user) {
        setProfileValues({ name: user.name, email: user.email });
      }
      setIsLoading(false);
    };
    loadUserData();
  }, [setProfileValues]);

  const handleUpdateProfile = async () => {
    if (validateProfileForm()) {
      setIsUpdatingProfile(true);
      const result = await updateProfile(profileData);
      setIsUpdatingProfile(false);
      if (result.success) {
        Alert.alert('Éxito', result.message);
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message);
      }
    }
  };

  const handleChangePassword = async () => {
    if (validatePasswordForm()) {
      setIsChangingPassword(true);
      const result = await changePassword(passwordData);
      setIsChangingPassword(false);
      if (result.success) {
        Alert.alert('Éxito', result.message);
        resetPasswordForm(); // Limpiar el formulario de contraseña
      } else {
        Alert.alert('Error', result.message);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[globalStyles.container, styles.scrollView]}>
      {/* Formulario de Edición de Perfil */}
      <View style={styles.formSection}>
        <Text style={styles.title}>Editar Perfil</Text>
        <FormField
          label="Nombre"
          {...getProfileFieldProps('name')}
          required
          placeholder="Nombre completo"
        />
        <FormField
          label="Correo Electrónico"
          {...getProfileFieldProps('email')}
          required
          placeholder="ejemplo@email.com"
          keyboardType="email-address"
        />
        <FormActions
          onCancel={() => navigation.goBack()}
          onSave={handleUpdateProfile}
          loading={isUpdatingProfile}
          saveText="Guardar Cambios"
        />
      </View>

      {/* Formulario de Cambio de Contraseña */}
      <View style={styles.formSection}>
        <Text style={styles.title}>Cambiar Contraseña</Text>
        <FormField
          label="Contraseña Actual"
          {...getPasswordFieldProps('current_password')}
          required
          placeholder="Tu contraseña actual"
          secureTextEntry
        />
        <FormField
          label="Nueva Contraseña"
          {...getPasswordFieldProps('password')}
          required
          placeholder="Mínimo 8 caracteres"
          secureTextEntry
        />
        <FormField
          label="Confirmar Nueva Contraseña"
          {...getPasswordFieldProps('password_confirmation')}
          required
          placeholder="Repite la nueva contraseña"
          secureTextEntry
        />
        <FormActions
          onCancel={resetPasswordForm} // Limpia el formulario de contraseña
          onSave={handleChangePassword}
          loading={isChangingPassword}
          saveText="Cambiar Contraseña"
          cancelText="Limpiar"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
});

export default EditProfileScreen;