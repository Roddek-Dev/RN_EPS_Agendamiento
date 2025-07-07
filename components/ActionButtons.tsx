// Fichero: components/ActionButtons.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit, Trash2 } from 'lucide-react-native';
import { colors, spacing } from '@/utils/globalStyles';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  // Si no se proporciona ninguna acción, no se renderiza nada.
  if (!onEdit && !onDelete) {
    return null;
  }

  return (
    <View style={styles.container}>
      {onEdit && (
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Edit color={colors.text.secondary} size={20} />
        </TouchableOpacity>
      )}
      {onDelete && (
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Trash2 color={colors.error} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  button: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
});
