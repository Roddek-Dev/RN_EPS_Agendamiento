import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Eye, Edit, Tag, FileText, DollarSign, Activity } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function ServicesListScreen() {
  const addService = () => router.push('/(main)/cruds/services/create');
  const viewService = (id: number) => router.push(`/(main)/cruds/services/${id}`);
  const editService = (id: number) => router.push(`/(main)/cruds/services/edit/${id}`);

  // Mock data - Array de servicios
  const services = [
    { id: 1, name: 'Consulta General', description: 'Consulta médica general con revisión completa.', price: 50000, status: 'disponible', category: 'Consultas' },
    { id: 2, name: 'Electrocardiograma', description: 'Análisis del ritmo cardíaco.', price: 75000, status: 'disponible', category: 'Exámenes' },
    { id: 3, name: 'Ecocardiograma', description: 'Examen del corazón por ultrasonido.', price: 120000, status: 'no disponible', category: 'Exámenes' },
    { id: 4, name: 'Radiografía de Tórax', description: 'Examen de rayos X para el área del tórax.', price: 85000, status: 'disponible', category: 'Imágenes' },
    { id: 5, name: 'Laboratorio Completo', description: 'Análisis de sangre y orina completo.', price: 95000, status: 'disponible', category: 'Laboratorio' },
  ];

  // Componente para la tarjeta de servicio, basado en PatientCard
  interface ServiceCardProps {
    service: typeof services[0];
  }

  const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
    <View style={globalStyles.card}>
      <View style={[globalStyles.row, { alignItems: 'flex-start' }]}>
        <View style={[globalStyles.avatar, { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
            <Tag color={colors.surface} size={24}/>
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={[globalStyles.row, { justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }]}>
            <Text style={globalStyles.itemTitle}>{service.name}</Text>
            <View style={[{
              backgroundColor: service.status === 'disponible' ? colors.success : colors.warning,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }]}>
              <Text style={[
                globalStyles.caption,
                { 
                  color: service.status === 'disponible' ? colors.successText : '#b45309',
                  fontWeight: '600',
                  fontSize: 12
                }
              ]}>
                {service.status === 'disponible' ? 'Disponible' : 'No Disponible'}
              </Text>
            </View>
          </View>
          
          <Text style={[globalStyles.caption, { marginBottom: 8 }]}>
            Categoría: {service.category}
          </Text>
          
          <View style={{ gap: 4, marginBottom: 8 }}>
            <View style={[globalStyles.row, { alignItems: 'center', gap: 6 }]}>
              <FileText color={colors.text.secondary} size={14} />
              <Text style={[globalStyles.caption, { fontSize: 12, flex: 1 }]} numberOfLines={2}>{service.description}</Text>
            </View>
            <View style={[globalStyles.row, { alignItems: 'center', gap: 6, marginTop: 4 }]}>
              <DollarSign color={colors.primary} size={16} />
              <Text style={[globalStyles.itemTitle, { fontSize: 16, color: colors.primary }]}>
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(service.price)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={[globalStyles.row, { justifyContent: 'flex-end', gap: 8, marginTop: 12 }]}>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.info }]}
          onPress={() => viewService(service.id)}
        >
          <Eye color={colors.infoText} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.success }]}
          onPress={() => editService(service.id)}
        >
          <Edit color={colors.successText} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.headerTitle}>Servicios</Text>
          <Text style={globalStyles.headerSubtitle}>
            {services.length} servicio{services.length !== 1 ? 's' : ''} registrado{services.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={addService}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.searchContainer, { marginHorizontal: 16, marginBottom: 16 }]}>
        <Search color={colors.text.secondary} size={20} />
        <TextInput
          style={globalStyles.searchInput}
          placeholder="Buscar servicios..."
          placeholderTextColor={colors.text.muted}
        />
      </View>

      <ScrollView 
        contentContainerStyle={[globalStyles.content, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </View>

        {services.length === 0 && (
          <View style={[globalStyles.center, { paddingVertical: 40 }]}>
            <Activity color={colors.text.secondary} size={48} />
            <Text style={[globalStyles.title, { marginTop: 16, marginBottom: 8 }]}>
              No hay servicios registrados
            </Text>
            <Text style={[globalStyles.caption, { textAlign: 'center', marginBottom: 20 }]}>
              Comienza agregando tu primer servicio al sistema
            </Text>
            <TouchableOpacity
              style={[globalStyles.button, { backgroundColor: colors.primary }]}
              onPress={addService}
            >
              <Plus color={colors.surface} size={20} />
              <Text style={[globalStyles.buttonText, { color: colors.surface }]}>
                Agregar Servicio
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}