import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, ArrowLeft, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data - in real app this would come from API
  const service = {
    id: Number(id),
    name: 'Consulta General',
    description: 'Consulta médica general con revisión completa del paciente',
    price: 50000,
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Precio no definido';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const editService = () => {
    router.push(`/(main)/cruds/services/edit/${id}` as any);
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
          <Text style={globalStyles.headerTitle}>Detalle de Servicio</Text>
          <Text style={globalStyles.headerSubtitle}>ID: {id}</Text>
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={editService}>
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
                <Text style={globalStyles.body}>{service.name}</Text>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Descripción</Text>
              <View style={[globalStyles.input, globalStyles.textArea, { backgroundColor: colors.background }]}>
                <Text style={globalStyles.body}>
                  {service.description || 'Sin descripción'}
                </Text>
              </View>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={globalStyles.label}>Precio</Text>
              <View style={[globalStyles.input, { backgroundColor: colors.background }]}>
                <View style={globalStyles.row}>
                  <DollarSign color={colors.primary} size={20} />
                  <Text style={[globalStyles.body, { marginLeft: 8, color: colors.primary, fontWeight: '600' }]}>
                    {formatPrice(service.price)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <View style={globalStyles.statsContainer}>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>23</Text>
              <Text style={globalStyles.statLabel}>Citas Este Mes</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>156</Text>
              <Text style={globalStyles.statLabel}>Citas Totales</Text>
            </View>
            <View style={globalStyles.statCard}>
              <Text style={globalStyles.statNumber}>4.8</Text>
              <Text style={globalStyles.statLabel}>Calificación</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}