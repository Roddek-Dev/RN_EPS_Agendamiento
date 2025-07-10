import React, { createContext, useState, useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/app/Services/conexion';
import { colors } from '@/utils/globalStyles';

// --- DEFINICIÓN DE TIPOS ---
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextData {
  authState: AuthState;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// --- CREACIÓN DEL CONTEXT ---
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// --- EL PROVEEDOR (PROVIDER) ---
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTokenFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userString = await AsyncStorage.getItem('user');

        if (token && userString) {
          const user: User = JSON.parse(userString);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setAuthState({ token, user, isAuthenticated: true });
        }
      } catch (e) {
        console.error('Failed to load auth state from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokenFromStorage();
  }, []);

  const login = async (user: User, token: string) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setAuthState({ token, user, isAuthenticated: true });
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  };

  const logout = async () => {
    try {
      delete api.defaults.headers.common['Authorization'];
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setAuthState({ token: null, user: null, isAuthenticated: false });
    } catch (e) {
      console.error('Failed to clear auth state', e);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- HOOK PERSONALIZADO ---
export const useAuth = () => {
  return useContext(AuthContext);
};
