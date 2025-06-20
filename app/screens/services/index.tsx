import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, DollarSign } from 'lucide-react-native';

export default function ServicesListScreen() {
  const services = [
    { id: 1, name: 'Consulta General', category: 'Consultas', price: 50000, duration: 30, status: 'active' },
    { id: 2, name: 'Electrocardiograma', category: 'Exámenes', price: 75000, duration: 45, status: 'active' },
    { id: 3, name: 'Ecocardiograma', category: 'Exámenes', price: 120000, duration: 60, status: 'active' },
    { id: 4, name: 'Radiografía', category: 'Imágenes', price: 80000, duration: 20, status: 'active' },
    { id: 5, name: 'Laboratorio Completo', category: 'Laboratorio', price: 95000, duration: 15, status: 'inactive' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicios..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.servicesList}>
          {services.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: service.status === 'active' ? '#dcfce7' : '#fef3c7' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: service.status === 'active' ? '#166534' : '#92400e' }
                    ]}>
                      {service.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <View style={styles.serviceDetails}>
                  <View style={styles.priceContainer}>
                    <DollarSign color="#2563eb" size={16} />
                    <Text style={styles.servicePrice}>{formatPrice(service.price)}</Text>
                  </View>
                  <Text style={styles.serviceDuration}>{service.duration} min</Text>
                </View>
              </View>
              
              <View style={styles.serviceActions}>
                <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
                  <Eye color="#2563eb" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                  <Edit color="#16a34a" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  servicesList: {
    gap: 12,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#eff6ff',
  },
  editButton: {
    backgroundColor: '#f0fdf4',
  },
});