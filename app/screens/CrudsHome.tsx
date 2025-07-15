import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native"; // ✅ AÑADIDO: Alert
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HeartPulse,
  ClipboardList,
  Users,
  Stethoscope,
  CalendarDays,
  ChevronRight,
  TrendingUp,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from "@/utils/globalStyles";
import { getStoredUser } from '@/app/Services/AuthService'; // ✅ AÑADIDO: Importar servicio de usuario

export default function CrudsHomeScreen() {
  const navigation = useNavigation();

  const modules = [
    {
      id: 'SpecialtyList',
      title: 'Especialidades',
      description: 'Gestionar especialidades médicas',
      icon: Stethoscope,
      color: colors.primary,
      count: 12,
    },
    {
      id: 'ServiceList',
      title: 'Servicios',
      description: 'Administrar servicios disponibles',
      icon: ClipboardList,
      color: colors.accent,
      count: 25,
    },
    {
      id: 'PatientList',
      title: 'Pacientes',
      description: 'Registro de pacientes',
      icon: Users,
      color: colors.secondary,
      count: 156,
    },
    {
      id: 'DoctorList',
      title: 'Doctores',
      description: 'Directorio médico',
      icon: HeartPulse,
      color: colors.warning,
      count: 8,
    },
    {
      id: 'AppointmentList',
      title: 'Citas',
      description: 'Historial de citas médicas',
      icon: CalendarDays,
      color: colors.purple,
      count: 342,
    },
  ];

  // ✅ FUNCIÓN MODIFICADA: Ahora es asíncrona y valida el rol
  const navigateToModule = async (moduleId: string) => {
    const user = await getStoredUser();

    // Si el usuario es 'admin', puede acceder a todo.
    if (user?.role === 'admin') {
      navigation.navigate(moduleId as never);
      return;
    }

    // Si el usuario es 'user', solo puede acceder a 'AppointmentList'.
    if (user?.role === 'user') {
      if (moduleId === 'AppointmentList') {
        navigation.navigate(moduleId as never);
      } else {
        // Si intenta acceder a otro módulo, muestra una alerta.
        Alert.alert(
          'Acceso Denegado',
          'No tienes los permisos necesarios para acceder a esta sección.'
        );
      }
      return;
    }

    // Fallback por si no se encuentra el usuario o el rol
    Alert.alert('Error', 'No se pudo verificar tu rol de usuario.');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header mejorado */}
        <View style={[globalStyles.section, { alignItems: "center", marginBottom: spacing.xxxl }]}>
          <Text style={globalStyles.titleLarge}>Gestión de Datos</Text>
          <Text style={globalStyles.subtitle}>Administra la información del sistema</Text>
        </View>

        {/* Módulos */}
        <View style={[globalStyles.section, { marginBottom: spacing.xxxl }]}>
          <View style={globalStyles.listContainer}>
            {modules.map((module) => (
              <TouchableOpacity
                key={module.id}
                style={globalStyles.listCard}
                onPress={() => navigateToModule(module.id)}
              >
                <View style={[globalStyles.avatar, { backgroundColor: module.color, justifyContent: "center" }]}>
                  <module.icon color={colors.text.inverse} size={24} />
                </View>

                <View style={globalStyles.listItemContent}>
                  <Text style={globalStyles.itemTitle}>{module.title}</Text>
                  <Text style={globalStyles.itemSubtitle}>{module.description}</Text>
                  <View style={[globalStyles.row, { marginTop: spacing.sm }]}>
                    <Text style={[globalStyles.captionMuted, { color: colors.primary }]}>{module.count} registros</Text>
                  </View>
                </View>

                <View style={globalStyles.listItemActions}>
                  <View style={[globalStyles.statusBadge, { backgroundColor: colors.info }]}>
                    <Text style={[globalStyles.statusText, { color: colors.infoText }]}>{module.count}</Text>
                  </View>
                  <ChevronRight color={colors.text.secondary} size={20} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estadísticas generales */}
        <View style={globalStyles.card}>
          <View style={[globalStyles.spaceBetween, { marginBottom: spacing.lg }]}>
            <Text style={globalStyles.sectionTitle}>Estadísticas Generales</Text>
            <TrendingUp color={colors.primary} size={20} />
          </View>
          <View style={globalStyles.statContainer}>
            <View style={globalStyles.statItem}>
              <Text style={globalStyles.statNumber}>543</Text>
              <Text style={globalStyles.statLabel}>Total Registros</Text>
            </View>
            <View style={globalStyles.statItem}>
              <Text style={globalStyles.statNumber}>24</Text>
              <Text style={globalStyles.statLabel}>Activos Hoy</Text>
            </View>
            <View style={globalStyles.statItem}>
              <Text style={globalStyles.statNumber}>98%</Text>
              <Text style={globalStyles.statLabel}>Disponibilidad</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}