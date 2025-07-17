import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'; // ✅ AÑADIR: useState y useEffect
import {
  Calendar,
  Users,
  UserCheck,
  Clock,
  Bell,
  TrendingUp,
} from 'lucide-react-native';
import { globalStyles, colors, spacing } from '@/utils/globalStyles';
import { getStoredUser, type User } from '@/app/Services/AuthService'; // ✅ AÑADIR: Importar servicio y tipo
import { useNavigation } from '@react-navigation/native'; // 1. Importa useNavigation
import { AppNavigationProp } from '@/app/navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp>(); // 3. Obtén el objeto de navegación

  const [user, setUser] = useState<User | null>(null);

  const quickActions = [
    {
      id: 1,
      title: 'Nueva Cita',
      icon: Calendar,
      color: colors.primary,
      targetScreen: 'AppointmentCreate',
    },
    {
      id: 2,
      title: 'Pacientes',
      icon: Users,
      color: colors.secondary,
      targetScreen: 'PatientList',
    },
    {
      id: 3,
      title: 'Doctores',
      icon: UserCheck,
      color: colors.warning,
      targetScreen: 'DoctorList',
    },
    {
      id: 4,
      title: 'Historial',
      icon: Clock,
      color: colors.purple,
      targetScreen: 'AppointmentList',
    },
  ];
  const recentActivity = [
    {
      id: 1,
      patient: 'María González',
      time: '10:00 AM',
      type: 'Consulta General',
      status: 'confirmed' as const,
    },
    {
      id: 2,
      patient: 'Carlos Rodríguez',
      time: '11:30 AM',
      type: 'Cardiología',
      status: 'pending' as const,
    },
    {
      id: 3,
      patient: 'Ana Martínez',
      time: '2:00 PM',
      type: 'Dermatología',
      status: 'confirmed' as const,
    },
  ];
  const stats = [
    { label: 'Citas Hoy', value: '24', icon: Calendar, color: colors.primary },
    { label: 'Pacientes', value: '156', icon: Users, color: colors.secondary },
    { label: 'Doctores', value: '8', icon: UserCheck, color: colors.warning },
  ];

  useEffect(() => {
    // Función para cargar los datos del usuario al abrir la pantalla
    const loadUserData = async () => {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUserData();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={[globalStyles.spaceBetween, { marginBottom: spacing.xxxl }]}
        >
          <View style={globalStyles.row}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              style={globalStyles.avatar}
            />
            <View>
              <Text style={globalStyles.title}>
                ¡Hola, {user ? user.name.split(' ')[0] : 'Dr.'}!
              </Text>
              <Text style={globalStyles.subtitle}>Bienvenido a EPS Salud</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[globalStyles.iconButton, globalStyles.iconButtonPrimary]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Bell color={colors.text.inverse} size={24} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View
          style={[
            globalStyles.row,
            { gap: spacing.md, marginBottom: spacing.xxxl },
          ]}
        >
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[
                globalStyles.cardCompact,
                { flex: 1, alignItems: 'center' },
              ]}
            >
              <View
                style={[
                  globalStyles.iconButton,
                  { backgroundColor: stat.color, marginBottom: spacing.md },
                ]}
              >
                <stat.icon color={colors.text.inverse} size={24} />
              </View>
              <Text style={globalStyles.statNumber}>{stat.value}</Text>
              <Text style={globalStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Acciones Rápidas</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  globalStyles.quickActionCard,
                  { backgroundColor: action.color },
                ]}
                onPress={() => (navigation as any).navigate('cruds', { 
                  screen: action.targetScreen 
                })}
              >
                <View
                  style={[
                    globalStyles.quickActionIcon,
                    { backgroundColor: 'rgba(255,255,255,0.2)' },
                  ]}
                >
                  <action.icon color={colors.text.inverse} size={24} />
                </View>
                <Text
                  style={[
                    globalStyles.quickActionText,
                    { color: colors.text.inverse },
                  ]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={globalStyles.section}>
          <View
            style={[globalStyles.spaceBetween, { marginBottom: spacing.lg }]}
          >
            <Text style={globalStyles.sectionTitle}>Próximas Citas</Text>
            <TouchableOpacity style={globalStyles.row}>
              <Text
                style={[globalStyles.captionMuted, { color: colors.primary }]}
              >
                Ver todas
              </Text>
              <TrendingUp
                color={colors.primary}
                size={16}
                style={{ marginLeft: spacing.xs }}
              />
            </TouchableOpacity>
          </View>

          <View style={globalStyles.appointmentsList}>
            {recentActivity.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={globalStyles.appointmentCard}
              >
                <View style={globalStyles.appointmentHeader}>
                  <View style={globalStyles.timeContainer}>
                    <Clock color={colors.text.secondary} size={16} />
                    <Text
                      style={[
                        globalStyles.body,
                        { fontWeight: '600', marginLeft: spacing.sm },
                      ]}
                    >
                      {activity.time}
                    </Text>
                  </View>
                  <View
                    style={[
                      globalStyles.statusBadge,
                      {
                        backgroundColor:
                          activity.status === 'confirmed'
                            ? colors.success
                            : colors.pending,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        globalStyles.statusText,
                        {
                          color:
                            activity.status === 'confirmed'
                              ? colors.successText
                              : colors.pendingText,
                        },
                      ]}
                    >
                      {activity.status === 'confirmed'
                        ? 'Confirmada'
                        : 'Pendiente'}
                    </Text>
                  </View>
                </View>
                <View style={globalStyles.appointmentDetails}>
                  <Text style={globalStyles.patientName}>
                    {activity.patient}
                  </Text>
                  <Text style={globalStyles.specialty}>{activity.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
