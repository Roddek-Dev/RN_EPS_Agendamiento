import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Eye, Edit, Heart, FileText, Users, Activity } from 'lucide-react-native';
import { globalStyles, colors } from '../../../utils/globalStyles';

export default function SpecialtiesListScreen() {
  const addSpecialty = () => router.push('/(main)/cruds/specialties/create');
  const viewSpecialty = (id: number) => router.push(`/(main)/cruds/specialties/${id}`);
  const editSpecialty = (id: number) => router.push(`/(main)/cruds/specialties/edit/${id}`);

  // Mock data - Array de especialidades
  const specialties = [
    { id: 1, name: 'Cardiología', description: 'Especialidad médica del corazón y sistema circulatorio', doctors: 3, status: 'active' },
    { id: 2, name: 'Dermatología', description: 'Cuidado de la piel y enfermedades cutáneas', doctors: 2, status: 'active' },
    { id: 3, name: 'Neurología', description: 'Sistema nervioso y enfermedades neurológicas', doctors: 1, status: 'active' },
    { id: 4, name: 'Pediatría', description: 'Medicina infantil y cuidado de niños', doctors: 2, status: 'active' },
    { id: 5, name: 'Ginecología', description: 'Salud femenina y reproductiva', doctors: 1, status: 'inactive' },
  ];

  // Componente para la tarjeta de especialidad
  interface SpecialtyCardProps {
    specialty: typeof specialties[0];
  }

  const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty }) => (
    <View style={globalStyles.card}>
      <View style={[globalStyles.row, { alignItems: 'flex-start' }]}>
        <View style={[globalStyles.avatar, { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
          <Heart color={colors.surface} size={24}/>
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={[globalStyles.row, { justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }]}>
            <Text style={globalStyles.itemTitle}>{specialty.name}</Text>
            <View style={[{
              backgroundColor: specialty.status === 'active' ? colors.success : colors.warning,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }]}>
              <Text style={[
                globalStyles.caption,
                { 
                  color: specialty.status === 'active' ? colors.successText : '#b45309',
                  fontWeight: '600',
                  fontSize: 12
                }
              ]}>
                {specialty.status === 'active' ? 'Activa' : 'Inactiva'}
              </Text>
            </View>
          </View>
          
          <View style={{ gap: 4, marginBottom: 8 }}>
            <View style={[globalStyles.row, { alignItems: 'center', gap: 6 }]}>
              <FileText color={colors.text.secondary} size={14} />
              <Text style={[globalStyles.caption, { fontSize: 12, flex: 1 }]} numberOfLines={2}>{specialty.description}</Text>
            </View>
            <View style={[globalStyles.row, { alignItems: 'center', gap: 6, marginTop: 4 }]}>
              <Users color={colors.primary} size={16} />
              <Text style={[globalStyles.itemTitle, { fontSize: 16, color: colors.primary }]}>
                {specialty.doctors} doctor{specialty.doctors !== 1 ? 'es' : ''} disponible{specialty.doctors !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={[globalStyles.row, { justifyContent: 'flex-end', gap: 8, marginTop: 12 }]}>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.info }]}
          onPress={() => viewSpecialty(specialty.id)}
        >
          <Eye color={colors.infoText} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.success }]}
          onPress={() => editSpecialty(specialty.id)}
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
          <Text style={globalStyles.headerTitle}>Especialidades</Text>
          <Text style={globalStyles.headerSubtitle}>
            {specialties.length} especialidad{specialties.length !== 1 ? 'es' : ''} registrada{specialties.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={addSpecialty}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.searchContainer, { marginHorizontal: 16, marginBottom: 16 }]}>
        <Search color={colors.text.secondary} size={20} />
        <TextInput
          style={globalStyles.searchInput}
          placeholder="Buscar especialidades..."
          placeholderTextColor={colors.text.muted}
        />
      </View>

      <ScrollView 
        contentContainerStyle={[globalStyles.content, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          {specialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </View>

        {specialties.length === 0 && (
          <View style={[globalStyles.center, { paddingVertical: 40 }]}>
            <Activity color={colors.text.secondary} size={48} />
            <Text style={[globalStyles.title, { marginTop: 16, marginBottom: 8 }]}>
              No hay especialidades registradas
            </Text>
            <Text style={[globalStyles.caption, { textAlign: 'center', marginBottom: 20 }]}>
              Comienza agregando tu primera especialidad al sistema
            </Text>
            <TouchableOpacity
              style={[globalStyles.button, { backgroundColor: colors.primary }]}
              onPress={addSpecialty}
            >
              <Plus color={colors.surface} size={20} />
              <Text style={[globalStyles.buttonText, { color: colors.surface }]}>
                Agregar Especialidad
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}