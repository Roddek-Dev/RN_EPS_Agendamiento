import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, ArrowLeft } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function SpecialtyDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const specialty = {
    id: Number(id),
    name: 'Cardiología',
    description: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.',
  };

  const editSpecialty = () => {
    router.push(`/(main)/cruds/specialties/edit/${id}` as any);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.surface }]} onPress={goBack}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle de Especialidad</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={editSpecialty}>
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.card}>
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Información General</Text>
            
            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Nombre</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <Text style={globalStyles.body}>{specialty.name}</Text>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Descripción</Text>
              <View style={[globalStyles.input, globalStyles.textArea, { backgroundColor: colors.background }]}>
                <Text style={globalStyles.body}>
                  {specialty.description || 'Sin descripción'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <View style={globalStyles.statsContainer}>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>3</Text>
              <Text style={globalStyles.statLabel}>Doctores</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>45</Text>
              <Text style={globalStyles.statLabel}>Citas Totales</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>12</Text>
              <Text style={globalStyles.statLabel}>Este Mes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}