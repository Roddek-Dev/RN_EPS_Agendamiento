import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Stethoscope } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function DoctorsListScreen() {
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Juan Pérez', 
      specialty_id: 1,
      specialty_name: 'Cardiología',
      avatar: 'https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 2, 
      name: 'Dra. María González', 
      specialty_id: 2,
      specialty_name: 'Dermatología',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 3, 
      name: 'Dr. Carlos López', 
      specialty_id: null,
      specialty_name: null,
      avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 4, 
      name: 'Dra. Ana Martínez', 
      specialty_id: 4,
      specialty_name: 'Pediatría',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/doctors/${id}` as any);
  };

  const editDoctor = (id: number) => {
    router.push(`/(main)/cruds/doctors/edit/${id}` as any);
  };

  const createDoctor = () => {
    router.push('/(main)/cruds/doctors/create' as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar doctores..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={createDoctor}>
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.listContainer}>
          {doctors.map((doctor) => (
            <View key={doctor.id} style={globalStyles.listItem}>
              <View style={globalStyles.row}>
                <Image source={{ uri: doctor.avatar }} style={globalStyles.avatar} />
                <View style={globalStyles.listItemContent}>
                  <Text style={globalStyles.itemTitle}>{doctor.name}</Text>
                  {doctor.specialty_name ? (
                    <View style={globalStyles.row}>
                      <Stethoscope color={colors.primary} size={14} />
                      <Text style={[globalStyles.caption, { marginLeft: 6, color: colors.primary, fontWeight: '600' }]}>
                        {doctor.specialty_name}
                      </Text>
                    </View>
                  ) : (
                    <Text style={[globalStyles.caption, { fontStyle: 'italic' }]}>Sin especialidad asignada</Text>
                  )}
                </View>
              </View>
              
              <View style={globalStyles.listItemActions}>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
                  onPress={() => viewDetails(doctor.id)}
                >
                  <Eye color={colors.primary} size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => editDoctor(doctor.id)}
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