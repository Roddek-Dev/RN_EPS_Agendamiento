import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Phone, Mail } from 'lucide-react-native';

export default function PatientsListScreen() {
  const patients = [
    { 
      id: 1, 
      name: 'María González', 
      email: 'maria.gonzalez@email.com',
      phone: '+57 300 123 4567',
      age: 34,
      lastVisit: '2024-01-10',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 2, 
      name: 'Carlos Rodríguez', 
      email: 'carlos.rodriguez@email.com',
      phone: '+57 310 456 7890',
      age: 45,
      lastVisit: '2024-01-08',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 3, 
      name: 'Ana Martínez', 
      email: 'ana.martinez@email.com',
      phone: '+57 320 789 0123',
      age: 28,
      lastVisit: '2024-01-05',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 4, 
      name: 'Luis Herrera', 
      email: 'luis.herrera@email.com',
      phone: '+57 305 234 5678',
      age: 52,
      lastVisit: '2023-12-28',
      status: 'inactive',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pacientes..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.patientsList}>
          {patients.map((patient) => (
            <View key={patient.id} style={styles.patientCard}>
              <View style={styles.patientInfo}>
                <Image source={{ uri: patient.avatar }} style={styles.avatar} />
                <View style={styles.patientDetails}>
                  <View style={styles.patientHeader}>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: patient.status === 'active' ? '#dcfce7' : '#fef3c7' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: patient.status === 'active' ? '#166534' : '#92400e' }
                      ]}>
                        {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.patientAge}>{patient.age} años</Text>
                  <View style={styles.contactInfo}>
                    <View style={styles.contactItem}>
                      <Mail color="#64748b" size={14} />
                      <Text style={styles.contactText}>{patient.email}</Text>
                    </View>
                    <View style={styles.contactItem}>
                      <Phone color="#64748b" size={14} />
                      <Text style={styles.contactText}>{patient.phone}</Text>
                    </View>
                  </View>
                  <Text style={styles.lastVisit}>Última visita: {patient.lastVisit}</Text>
                </View>
              </View>
              
              <View style={styles.patientActions}>
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
  patientsList: {
    gap: 12,
    paddingBottom: 20,
  },
  patientCard: {
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
  patientInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  patientDetails: {
    flex: 1,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  patientName: {
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
  patientAge: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  contactInfo: {
    gap: 4,
    marginBottom: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 12,
    color: '#64748b',
  },
  lastVisit: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  patientActions: {
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