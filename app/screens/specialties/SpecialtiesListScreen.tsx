import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit, Eye } from 'lucide-react-native';
import { globalStyles, colors } from '@/app/utils/globalStyles';

export default function SpecialtiesListScreen() {
  const specialties = [
    { id: 1, name: 'Cardiología', description: 'Especialidad médica del corazón y sistema cardiovascular' },
    { id: 2, name: 'Dermatología', description: 'Cuidado y tratamiento de la piel' },
    { id: 3, name: 'Neurología', description: 'Diagnóstico y tratamiento del sistema nervioso' },
    { id: 4, name: 'Pediatría', description: 'Medicina especializada en niños y adolescentes' },
    { id: 5, name: 'Ginecología', description: null },
    { id: 6, name: 'Ortopedia', description: 'Tratamiento del sistema musculoesquelético' },
  ];

  const viewDetails = (id: number) => {
    router.push(`/(main)/cruds/specialties/${id}` as any);
  };

  const editSpecialty = (id: number) => {
    router.push(`/(main)/cruds/specialties/edit/${id}` as any);
  };

  const createSpecialty = () => {
    router.push('/(main)/cruds/specialties/create' as any);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar especialidades..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={createSpecialty}>
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content}>
        <View style={globalStyles.listContainer}>
          {specialties.map((specialty) => (
            <View key={specialty.id} style={globalStyles.listItem}>
              <View style={globalStyles.listItemContent}>
                <Text style={globalStyles.itemTitle}>{specialty.name}</Text>
                {specialty.description && (
                  <Text style={globalStyles.caption}>{specialty.description}</Text>
                )}
              </View>
              
              <View style={globalStyles.listItemActions}>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
                  onPress={() => viewDetails(specialty.id)}
                >
                  <Eye color={colors.primary} size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => editSpecialty(specialty.id)}
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