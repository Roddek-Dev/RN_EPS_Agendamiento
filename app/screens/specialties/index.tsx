import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye } from 'lucide-react-native';

export default function SpecialtiesListScreen() {
  const specialties = [
    { id: 1, name: 'Cardiología', description: 'Especialidad médica del corazón', doctors: 3, status: 'active' },
    { id: 2, name: 'Dermatología', description: 'Cuidado de la piel', doctors: 2, status: 'active' },
    { id: 3, name: 'Neurología', description: 'Sistema nervioso', doctors: 1, status: 'active' },
    { id: 4, name: 'Pediatría', description: 'Medicina infantil', doctors: 2, status: 'active' },
    { id: 5, name: 'Ginecología', description: 'Salud femenina', doctors: 1, status: 'inactive' },
  ];

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/specialties/${id}` as any);
  };

  const editSpecialty = (id: number) => {
    router.push(`/(main)/cruds/specialties/edit/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar especialidades..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.specialtiesList}>
          {specialties.map((specialty) => (
            <View key={specialty.id} style={styles.specialtyCard}>
              <View style={styles.specialtyInfo}>
                <View style={styles.specialtyHeader}>
                  <Text style={styles.specialtyName}>{specialty.name}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: specialty.status === 'active' ? '#dcfce7' : '#fef3c7' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: specialty.status === 'active' ? '#166534' : '#92400e' }
                    ]}>
                      {specialty.status === 'active' ? 'Activa' : 'Inactiva'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.specialtyDescription}>{specialty.description}</Text>
                <Text style={styles.doctorCount}>{specialty.doctors} doctores disponibles</Text>
              </View>
              
              <View style={styles.specialtyActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.viewButton]}
                  onPress={() => viewDetails(specialty.id)}
                >
                  <Eye color="#2563eb" size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => editSpecialty(specialty.id)}
                >
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
  specialtiesList: {
    gap: 12,
    paddingBottom: 20,
  },
  specialtyCard: {
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
  specialtyInfo: {
    flex: 1,
  },
  specialtyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialtyName: {
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
  specialtyDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  doctorCount: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  specialtyActions: {
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