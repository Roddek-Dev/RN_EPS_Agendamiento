import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Edit, ArrowLeft, Tag, FileText, DollarSign, BarChart2, Calendar, Clock } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const service = {
    id: Number(id),
    name: 'Consulta General',
    description: 'Consulta médica general con revisión completa del paciente, diagnóstico y formulación de tratamiento inicial.',
    price: 50000,
    status: 'disponible',
    category: 'Consultas',
    createdAt: '2023-02-15',
    updatedAt: '2024-01-20',
    appointmentsThisMonth: 23,
    appointmentsTotal: 156,
  };

  const editService = () => {
    router.push(`/(main)/cruds/services/edit/${id}` as any);
  };

  // Componente reutilizable para las filas de detalles
  interface DetailRowProps {
    icon: React.ComponentType<{ color?: string; size?: number }>;
    value: string | number;
    label?: string;
    color?: string;
  }

  const DetailRow = ({ icon: Icon, value, label, color = colors.text.secondary }: DetailRowProps) => (
    <View style={[globalStyles.row, { gap: 12, alignItems: 'flex-start', marginBottom: 12 }]}>
      <Icon color={color} size={20} />
      <View>
        {label && <Text style={globalStyles.caption}>{label}</Text>}
        <Text style={[globalStyles.detailText, !label && {lineHeight: 20}]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.iconButton} onPress={() => router.back()}>
          <ArrowLeft color={colors.text.secondary} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={globalStyles.headerTitle}>Detalle del Servicio</Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={editService}
        >
          <Edit color={colors.surface} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={[globalStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <View style={[globalStyles.avatarLarge, { width: 100, height: 100, borderRadius: 50, marginBottom: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
            <Tag color={colors.surface} size={48} />
          </View>
          <Text style={[globalStyles.title, { fontSize: 22, textAlign: 'center' }]}>{service.name}</Text>
          <View style={[{ 
            backgroundColor: service.status === 'disponible' ? '#dcfce7' : '#fef3c7',
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 16
          }]}>
            <Text style={[globalStyles.caption, { 
              color: service.status === 'disponible' ? '#166534' : '#92400e',
              fontWeight: '600', fontSize: 14
            }]}>
              {service.status === 'disponible' ? 'Disponible' : 'No Disponible'}
            </Text>
          </View>
          <View style={[globalStyles.row, { justifyContent: 'space-around', width: '100%' }]}>
            <View style={globalStyles.center}>
              <DollarSign color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(service.price)}</Text>
            </View>
            <View style={globalStyles.center}>
              <BarChart2 color={colors.text.secondary} size={24} />
              <Text style={globalStyles.itemTitle}>{service.appointmentsTotal} citas</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información General</Text>
          <DetailRow icon={Tag} value={service.category} label="Categoría" />
          <DetailRow icon={FileText} value={service.description} label="Descripción" />
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>
          <DetailRow icon={Calendar} value={`${service.appointmentsThisMonth} citas`} label="Este mes" />
          <DetailRow icon={BarChart2} value={`${service.appointmentsTotal} citas`} label="En total" />
        </View>
        
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Información del Sistema</Text>
          <View style={{ gap: 8 }}>
            <View style={[globalStyles.row, { justifyContent: 'space-between', paddingVertical: 8 }]}>
              <Text style={[globalStyles.caption, { fontWeight: '500' }]}>Fecha de Creación:</Text>
              <Text style={globalStyles.detailText}>{service.createdAt}</Text>
            </View>
            <View style={[globalStyles.row, { justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f1f5f9' }]}>
              <Text style={[globalStyles.caption, { fontWeight: '500' }]}>Última Actualización:</Text>
              <Text style={globalStyles.detailText}>{service.updatedAt}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}