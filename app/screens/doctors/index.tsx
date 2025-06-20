import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Star, Calendar } from 'lucide-react-native';

export default function DoctorsListScreen() {
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Juan Pérez', 
      specialty: 'Cardiología',
      experience: '10 años',
      rating: 4.8,
      appointments: 156,
      status: 'available',
      avatar: 'https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 2, 
      name: 'Dra. María González', 
      specialty: 'Dermatología',
      experience: '8 años',
      rating: 4.9,
      appointments: 98,
      status: 'busy',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 3, 
      name: 'Dr. Carlos López', 
      specialty: 'Cardiología',
      experience: '12 años',
      rating: 4.7,
      appointments: 203,
      status: 'available',
      avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 4, 
      name: 'Dra. Ana Martínez', 
      specialty: 'Pediatría',
      experience: '6 años',
      rating: 4.6,
      appointments: 87,
      status: 'offline',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#dcfce7';
      case 'busy':
        return '#fef3c7';
      case 'offline':
        return '#fee2e2';
      default:
        return '#f1f5f9';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#166534';
      case 'busy':
        return '#92400e';
      case 'offline':
        return '#991b1b';
      default:
        return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'busy':
        return 'Ocupado';
      case 'offline':
        return 'Fuera de línea';
      default:
        return 'Desconocido';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar doctores..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.doctorsList}>
          {doctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <View style={styles.doctorInfo}>
                <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
                <View style={styles.doctorDetails}>
                  <View style={styles.doctorHeader}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(doctor.status) }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: getStatusTextColor(doctor.status) }
                      ]}>
                        {getStatusText(doctor.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <Text style={styles.doctorExperience}>{doctor.experience} de experiencia</Text>
                  <View style={styles.doctorStats}>
                    <View style={styles.ratingContainer}>
                      <Star color="#fbbf24" size={16} fill="#fbbf24" />
                      <Text style={styles.rating}>{doctor.rating}</Text>
                    </View>
                    <View style={styles.appointmentsContainer}>
                      <Calendar color="#64748b" size={16} />
                      <Text style={styles.appointments}>{doctor.appointments} citas</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={styles.doctorActions}>
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
  doctorsList: {
    gap: 12,
    paddingBottom: 20,
  },
  doctorCard: {
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
  doctorInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  doctorName: {
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
  doctorSpecialty: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 4,
  },
  doctorExperience: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  doctorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  appointmentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appointments: {
    fontSize: 12,
    color: '#64748b',
  },
  doctorActions: {
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