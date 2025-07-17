
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStoredUser, logout, changePassword, type User, type ChangePasswordData } from '../../Services/AuthService';

// 1. Definir las props que el componente recibirá
interface ProfileScreenProps {
  onLogoutSuccess: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogoutSuccess }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // 2. Llamar a la función de la prop en lugar de navegar manualmente
      onLogoutSuccess();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Button title="Editar Perfil" onPress={handleEditProfile} />
        <View style={styles.separator} />

      </View>



      <View style={styles.logoutButtonContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  actionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  separator: {
    height: 10,
  },
  logoutButtonContainer: {
    marginTop: 'auto',
    width: '100%',
    paddingBottom: 20,
  },
});

export default ProfileScreen;
