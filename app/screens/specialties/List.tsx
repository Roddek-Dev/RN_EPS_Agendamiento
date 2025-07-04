import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, FileText, Users, Activity } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { SearchHeader } from '@/components/SearchHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButtons } from '@/components/ActionButtons';
import { EmptyState } from '@/components/EmptyState';

export default function SpecialtiesListScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const specialties = [
    {
      id: 1,
      name: 'Cardiología',
      description: 'Especialidad médica del corazón y sistema circulatorio',
      doctors: 3,
      status: 'active' as const,
    },
    {
      id: 2,
      name: 'Dermatología',
      description: 'Cuidado de la piel y enfermedades cutáneas',
      doctors: 2,
      status: 'active' as const,
    },
    {
      id: 3,
      name: 'Neurología',
      description: 'Sistema nervioso y enfermedades neurológicas',
      doctors: 1,
      status: 'active' as const,
    },
    {
      id: 4,
      name: 'Pediatría',
      description: 'Medicina infantil y cuidado de niños',
      doctors: 2,
      status: 'active' as const,
    },
    {
      id: 5,
      name: 'Ginecología',
      description: 'Salud femenina y reproductiva',
      doctors: 1,
      status: 'inactive' as const,
    },
  ];

  const SpecialtyCard = ({
    specialty,
  }: {
    specialty: (typeof specialties)[0];
  }) => (
    <View style={globalStyles.listCard}>
      <View
        style={[
          globalStyles.avatar,
          {
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Heart color={colors.surface} size={24} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          style={[
            globalStyles.row,
            {
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 4,
            },
          ]}
        >
          <Text style={globalStyles.itemTitle}>{specialty.name}</Text>
          <StatusBadge
            status={specialty.status}
            customText={specialty.status === 'active' ? 'Activa' : 'Inactiva'}
          />
        </View>
        <View style={{ gap: 4, marginBottom: 8 }}>
          <View style={[globalStyles.row, { alignItems: 'center', gap: 6 }]}>
            <FileText color={colors.text.secondary} size={14} />
            <Text
              style={[globalStyles.caption, { fontSize: 12, flex: 1 }]}
              numberOfLines={2}
            >
              {specialty.description}
            </Text>
          </View>
          <View
            style={[
              globalStyles.row,
              { alignItems: 'center', gap: 6, marginTop: 4 },
            ]}
          >
            <Users color={colors.primary} size={16} />
            <Text
              style={[
                globalStyles.itemTitle,
                { fontSize: 16, color: colors.primary },
              ]}
            >
              {specialty.doctors} doctor{specialty.doctors !== 1 ? 'es' : ''}{' '}
              disponible{specialty.doctors !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>
      <ActionButtons
        onView={() => navigation.navigate('SpecialtyDetail', { id: specialty.id })}
        onEdit={() => navigation.navigate('SpecialtyEdit', { id: specialty.id })}
      />
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader
        placeholder="Buscar especialidades..."
        onAdd={() => navigation.navigate('SpecialtyCreate')}
      />
      <ScrollView
        contentContainerStyle={[globalStyles.content, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {specialties.length > 0 ? (
          <View style={{ gap: 12 }}>
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </View>
        ) : (
          <EmptyState
            icon={Activity}
            title="No hay especialidades registradas"
            subtitle="Comienza agregando tu primera especialidad al sistema"
            buttonText="Agregar Especialidad"
            onButtonPress={() => navigation.navigate('SpecialtyCreate')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
