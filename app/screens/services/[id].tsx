import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClipboardList, DollarSign, Clock, Edit } from 'lucide-react-native';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock data
  const service = {
    id: Number(id),
    name: 'Consulta General',
    description: 'Consulta médica básica para evaluación inicial del paciente.',
    price: 50000,
    duration: 30,
    category: 'Consultas',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    specialties: ['Medicina General', 'Pediatría', 'Geriatría'],
  };

  const editService = () => {
    router.push(`/(main)/cruds/services/edit/${id}` as any);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{service.name}</Text>
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
          <TouchableOpacity style={styles.editButton} onPress={editService}>
            <Edit color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <DollarSign color="#dc2626" size={24} />
            </View>
            <Text style={styles.statNumber}>{formatPrice(service.price)}</Text>
            <Text style={styles.statLabel}>Precio</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Clock color="#16a34a" size={24} />
            </View>
            <Text style={styles.statNumber}>{service.duration} min</Text>
            <Text style={styles.statLabel}>Duración</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <ClipboardList color="#2563eb" size={24} />
            </View>
            <Text style={styles.statNumber}>{service.specialties.length}</Text>
            <Text style={styles.statLabel}>Especialidades</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoría</Text>
          <View style={styles.categoryCard}>
            <Text style={styles.categoryText}>{service.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especialidades Relacionadas</Text>
          <View style={styles.specialtiesList}>
            {service.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyItem}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Sistema</Text>
          <View style={styles.metadataCard}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Fecha de Creación:</Text>
              <Text style={styles.metadataValue}>{service.createdAt}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Última Actualización:</Text>
              <Text style={styles.metadataValue}>{service.updatedAt}</Text>
            </View>
          </View>
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
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#dc2626',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontSize: 16,
    color: '#1e293b',
  },
  specialtiesList: {
    gap: 8,
  },
  specialtyItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  specialtyText: {
    fontSize: 16,
    color: '#1e293b',
  },
  metadataCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  metadataLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 14,
    color: '#1e293b',
  },
});