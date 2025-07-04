import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Eye, Edit } from 'lucide-react-native';
import { globalStyles, colors } from '@/utils/globalStyles';
import { StatusBadge } from '@/components/StatusBadge';
import { ContactInfo } from '@/components/ContactInfo';

export default function PatientsListScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const patients = [
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+57 300 123 4567',
      age: 34,
      lastVisit: '2024-01-10',
      status: 'active' as const,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+57 310 456 7890',
      age: 45,
      lastVisit: '2024-01-08',
      status: 'active' as const,
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+57 320 789 0123',
      age: 28,
      lastVisit: '2024-01-05',
      status: 'active' as const,
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      name: 'Luis Herrera',
      email: 'luis.herrera@email.com',
      phone: '+57 305 234 5678',
      age: 52,
      lastVisit: '2023-12-28',
      status: 'inactive' as const,
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const PatientCard = ({ patient }: { patient: (typeof patients)[0] }) => (
    <View style={globalStyles.listCard}>
      <Image source={{ uri: patient.avatar }} style={globalStyles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          style={[
            globalStyles.row,
            { justifyContent: 'space-between', marginBottom: 4 },
          ]}
        >
          <Text style={globalStyles.itemTitle}>{patient.name}</Text>
          <StatusBadge status={patient.status} />
        </View>
        <Text style={[globalStyles.caption, { marginBottom: 8 }]}>
          {patient.age} años
        </Text>
        <ContactInfo phone={patient.phone} email={patient.email} />
        <Text
          style={[
            globalStyles.caption,
            { color: colors.primary, fontWeight: '500' },
          ]}
        >
          Última visita: {patient.lastVisit}
        </Text>
      </View>
      <View style={globalStyles.listItemActions}>
        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.info }]}
          onPress={() => navigation.navigate('PatientDetail', { id: patient.id })}
        >
          <Eye color={colors.infoText} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.actionButton,
            { backgroundColor: colors.success },
          ]}
          onPress={() => navigation.navigate('PatientEdit', { id: patient.id })}
        >
          <Edit color={colors.successText} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.searchContainer}>
          <Search
            color={colors.text.secondary}
            size={20}
            style={globalStyles.searchIcon}
          />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Buscar pacientes..."
            placeholderTextColor={colors.text.muted}
          />
        </View>
        <TouchableOpacity
          style={[globalStyles.iconButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('PatientCreate')}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={{ gap: 12 }}>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
