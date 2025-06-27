import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Edit, Eye, Mail } from 'lucide-react-native';
import { globalStyles, colors, spacing } from '../../../utils/globalStyles';

export default function PatientsListScreen() {
  const patients = [
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: null,
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      name: 'Luis Herrera',
      email: 'luis.herrera@email.com',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      <View style={[globalStyles.header, { gap: spacing.sm }]}>
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
          onPress={createPatient}
        >
          <Plus color={colors.surface} size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <View style={globalStyles.listItem}>
            <View style={globalStyles.row}>
              <Image
                source={{ uri: item.avatar }}
                style={globalStyles.avatar}
              />
              <View style={globalStyles.listItemContent}>
                <Text style={globalStyles.itemTitle}>{item.name}</Text>
                {item.email ? (
                  <View style={[globalStyles.row, { marginTop: spacing.xs }]}>
                    <Mail color={colors.text.secondary} size={14} />
                    <Text
                      style={[globalStyles.caption, { marginLeft: spacing.xs }]}
                    >
                      {item.email}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      globalStyles.caption,
                      { fontStyle: 'italic', marginTop: spacing.xs },
                    ]}
                  >
                    Sin email registrado
                  </Text>
                )}
              </View>
            </View>
            <View style={globalStyles.listItemActions}>
              <TouchableOpacity
                style={[
                  globalStyles.actionButton,
                  { backgroundColor: colors.info },
                ]}
                onPress={() => viewDetails(item.id)}
              >
                <Eye color={colors.infoText} size={16} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  globalStyles.actionButton,
                  { backgroundColor: colors.success },
                ]}
                onPress={() => editPatient(item.id)}
              >
                <Edit color={colors.successText} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={globalStyles.content}
      />
    </SafeAreaView>
  );
}
