// Fichero: components/ListItemCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, globalStyles, spacing } from '@/utils/globalStyles';
import { ActionButtons } from './ActionButtons'; // Importamos nuestro componente de acciones

interface ListItemCardProps {
  // --- Props de Contenido ---
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBackgroundColor?: string; // ✅ AÑADIR ESTA LÍNEA
  trailingText?: string;

  // --- Props de Acción ---
  onPress: () => void; // Acción principal al tocar el contenido (generalmente para "ver")
  onEdit?: () => void; // Si se provee, muestra el botón de editar
  onDelete?: () => void; // Si se provee, muestra el botón de eliminar
}

export const ListItemCard: React.FC<ListItemCardProps> = ({
  title,
  subtitle,
  icon,
  iconBackgroundColor,
  trailingText,
  onPress,
  onEdit,
  onDelete,
}) => {
  const showActions = !!onEdit || !!onDelete;

  const renderAvatar = () => {
    // ... (la lógica del avatar/icono no cambia)
    if (icon) return <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>{icon}</View>;
    return (
      <View style={styles.avatarInitial}>
        <Text style={styles.avatarInitialText}>
          {title ? title.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      {/* El contenido principal sigue siendo clickeable para la acción de "ver" */}
      <TouchableOpacity
        style={styles.contentTouchable}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {renderAvatar()}
        <View style={styles.textContent}>
          <Text style={globalStyles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={globalStyles.body} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {trailingText && (
          <Text style={styles.trailingText}>{trailingText}</Text>
        )}
        <ChevronRight color={colors.text.muted} size={22} />
      </TouchableOpacity>

      {/* ✅ La sección de botones solo se renderiza si se pasa onEdit o onDelete */}
      {showActions && <ActionButtons onEdit={onEdit} onDelete={onDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...globalStyles.card,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    padding: 0, // El padding se maneja adentro para separar contenido de acciones
  },
  contentTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitialText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  trailingText: {
    ...globalStyles.body,
    marginRight: spacing.sm,
    fontSize: 12,
  },
});
