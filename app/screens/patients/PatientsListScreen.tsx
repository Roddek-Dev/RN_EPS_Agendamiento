import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye, Mail } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function PatientsListScreen() {
  const patients = [
    { 
      id: 1, 
      name: 'María González', 
      email: 'maria.gonzalez@email.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 2, 
      name: 'Carlos Rodríguez', 
      email: null,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 3, 
      name: 'Ana Martínez', 
      email: 'ana.martinez@email.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 4, 
      name: 'Luis Herrera', 
      email: 'luis.herrera@email.com',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/patients/${id}` as any);
  };

  const editPatient = (id: number) => {
    router.push(`/(main)/cruds/patients/edit/${id}` as any);
  };

  const createPatient = () => {
    router.push('/(main)/cruds/patients/create' as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar pacientes..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={createPatient}>
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.listContainer}>
          {patients.map((patient) => (
            <View key={patient.id} style={globalStyles.listItem}>
              <View style={globalStyles.row}>
                <Image source={{ uri: patient.avatar }} style={globalStyles.avatar} />
                <View style={globalStyles.listItemContent}>
                  <Text style={globalStyles.itemTitle}>{patient.name}</Text>
                  {patient.email ? (
                    <View style={globalStyles.row}>
                      <Mail color={colors.text.secondary} size={14} />
                      <Text style={[globalStyles.caption, { marginLeft: 6 }]}>{patient.email}</Text>
                    </View>
                  ) : (
                    <Text style={[globalStyles.caption, { fontStyle: 'italic' }]}>Sin email registrado</Text>
                  )}
                </View>
              </View>
              
              <View style={globalStyles.listItemActions}>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
                  onPress={() => viewDetails(patient.id)}
                >
                  <Eye color={colors.primary} size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => editPatient(patient.id)}
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