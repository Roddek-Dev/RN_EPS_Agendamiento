import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, DollarSign } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function ServicesListScreen() {
  const services = [
    { id: 1, name: 'Consulta General', description: 'Consulta médica general', price: 50000 },
    { id: 2, name: 'Electrocardiograma', description: null, price: 75000 },
    { id: 3, name: 'Ecocardiograma', description: 'Examen del corazón por ultrasonido', price: 120000 },
    { id: 4, name: 'Radiografía', description: 'Examen de rayos X', price: null },
    { id: 5, name: 'Laboratorio Completo', description: 'Análisis de sangre completo', price: 95000 },
  ];

  const formatPrice = (price: number | null) => {
    if (!price) return 'Precio no definido';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/services/${id}` as any);
  };

  const editService = (id: number) => {
    router.push(`/(main)/cruds/services/edit/${id}` as any);
  };

  const createService = () => {
    router.push('/(main)/cruds/services/create' as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar servicios..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={createService}>
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.listContainer}>
          {services.map((service) => (
            <View key={service.id} style={globalStyles.listItem}>
              <View style={globalStyles.listItemContent}>
                <Text style={globalStyles.itemTitle}>{service.name}</Text>
                {service.description && (
                  <Text style={globalStyles.caption}>{service.description}</Text>
                )}
                <View style={[globalStyles.row, { marginTop: 8 }]}>
                  <DollarSign color={colors.primary} size={16} />
                  <Text style={[globalStyles.caption, { color: colors.primary, fontWeight: '600', marginLeft: 4 }]}>
                    {formatPrice(service.price)}
                  </Text>
                </View>
              </View>
              
              <View style={globalStyles.listItemActions}>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
                  onPress={() => viewDetails(service.id)}
                >
                  <Eye color={colors.primary} size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => editService(service.id)}
                >
                  <Edit color={colors.secondary} size={16} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}