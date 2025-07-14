import { StyleSheet } from 'react-native';

// === SISTEMA DE DISEÑO UNIFICADO (OPTIMIZADO) ===
export const colors = {
  // Colores primarios con un toque más moderno
  primary: '#007AFF', // Un azul estándar y vibrante, excelente para la accesibilidad
  secondary: '#34C759', // Verde para éxito y acciones secundarias positivas
  accent: '#FF3B30', // Rojo brillante para errores o acciones destructivas
  warning: '#FF9500', // Naranja para advertencias
  purple: '#AF52DE', // Un púrpura más suave y agradable

  // Colores de superficie y fondo para una UI más limpia
  background: '#F2F2F7', // Un fondo gris claro que reduce la fatiga visual
  surface: '#FFFFFF',
  surfaceVariant: '#E5E5EA', // Ideal para fondos de elementos sutiles

  // Sistema de texto mejorado para máxima legibilidad
  text: {
    primary: '#1C1C1E', // Negro intenso para el texto principal
    secondary: '#636366', // Gris oscuro para información secundaria
    muted: '#8E8E93', // Gris más claro para texto deshabilitado o de apoyo
    inverse: '#FFFFFF',
  },

  // Bordes y divisores más sutiles
  border: '#D1D1D6',
  borderLight: '#E5E5EA',
  borderDark: '#C7C7CC',

  // Estados semánticos con mayor contraste y claridad
  success: '#E8F5E9',
  successText: '#1B5E20',
  successBorder: '#A5D6A7',
  pending: '#FFF8E1',
  pendingText: '#6D4C41',
  pendingBorder: '#FFD54F',
  error: '#FFEBEE',
  errorText: '#B71C1C',
  errorBorder: '#EF9A9A',
  info: '#E3F2FD',
  infoText: '#0D47A1',
  infoBorder: '#90CAF9',

  // Overlay y sombras
  overlay: 'rgba(0, 0, 0, 0.45)',
  shadowColor: '#000000',
};

// Escala de espaciado más armónica y consistente
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24, // Aumentado para dar más aire a los layouts
  xxl: 32,
  xxxl: 40,
  xxxxl: 56,
};

// Radios de borde para un look más suave y actual
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// Sombras más naturales y sutiles para un efecto de profundidad refinado
export const shadows = {
  sm: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
};

// Tipografía con pesos y tamaños ajustados para una jerarquía visual clara
// (con `as const` para garantizar la compatibilidad con TypeScript)
export const typography = {
  // Títulos
  h1: {
    fontSize: 30,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h2: {
    fontSize: 26,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: colors.text.primary,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text.primary,
  },

  // Texto del cuerpo
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodySemibold: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text.primary,
    lineHeight: 24,
  },

  // Texto pequeño
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  captionMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  // Texto muy pequeño
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.text.muted,
    lineHeight: 18,
  },
  smallMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.text.muted,
    lineHeight: 18,
  },
};

// === HOJA DE ESTILOS GLOBAL ===
export const globalStyles = StyleSheet.create({
  // === LAYOUTS FUNDAMENTALES ===
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    flexGrow: 1,
  },
  contentNoPadding: {
    flexGrow: 1,
  },

  // Flexbox helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: { flex: 1 },

  // === CABECERAS ===
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    minHeight: 70,
    borderBottomColor: colors.border, 
  },
  headerTitle: {
    ...typography.h3,
    flex: 1,
    marginLeft: spacing.md,
  },
  headerSubtitle: {
    ...typography.caption,
    marginTop: spacing.xs,
  },

  // === TARJETAS Y CONTENEDORES ===
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  cardCompact: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardFlat: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // === SECCIONES ===
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl, // Añadido para alinear con el contenido
  },
  sectionTitleLarge: {
    ...typography.h3,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl, // Añadido para alinear con el contenido
  },

  // === BOTONES ===
  button: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    ...shadows.sm,
  },
  buttonAccent: {
    backgroundColor: colors.accent,
    ...shadows.sm,
  },
  buttonWarning: {
    backgroundColor: colors.warning,
    ...shadows.sm,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },

  // Texto de botones
  buttonText: {
    ...typography.bodySemibold,
    color: colors.text.inverse,
    marginHorizontal: spacing.sm,
  },
  buttonTextOutline: {
    ...typography.bodySemibold,
    color: colors.primary,
    marginHorizontal: spacing.sm,
  },
  buttonTextGhost: {
    ...typography.bodySemibold,
    color: colors.primary,
    marginHorizontal: spacing.sm,
  },

  // Botones especiales
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPrimary: {
    backgroundColor: colors.primary,
  },

  // === FORMULARIOS ===
  label: {
    ...typography.captionMedium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 50,
    ...typography.body,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    ...shadows.sm,
  },
  inputError: {
    borderColor: colors.accent,
    borderWidth: 1.5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    ...typography.body,
    height: '100%',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },

  // Acciones de formulario
  formActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  formButton: {
    flex: 1,
  },

  // === TYPOGRAPHY ===
  title: typography.h1,
  titleLarge: {
    ...typography.h1,
    fontSize: 34,
    lineHeight: 42,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  itemTitle: typography.h4,
  itemSubtitle: typography.caption,
  caption: typography.caption,
  captionMuted: {
    ...typography.caption,
    color: colors.text.muted,
  },
  body: typography.body,
  bodySecondary: {
    ...typography.body,
    color: colors.text.secondary,
  },

  // === AVATARES ===
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
    backgroundColor: colors.surfaceVariant,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.xl,
    backgroundColor: colors.surfaceVariant,
  },
  avatarXLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.xl,
    backgroundColor: colors.surfaceVariant,
  },

  // === BÚSQUEDA ===
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
  },

  // === LISTAS ===
  listContainer: {
    gap: spacing.md,
  },
  listItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shadows.md,
  },
  listItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  listItemActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.md,
  },

  // === BOTONES DE ACCIÓN ===
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === BADGES Y ESTADOS ===
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  statusText: {
    ...typography.smallMedium,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
  },

  // === FILTROS ===
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.captionMedium,
    color: colors.text.secondary,
  },
  filterTextActive: {
    ...typography.captionMedium,
    color: colors.text.inverse,
  },

  // === CITAS Y APPOINTMENTS ===
  appointmentsList: {
    gap: spacing.lg,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.sm,
  },
  appointmentDetails: {
    gap: spacing.xs,
    flex: 1,
  },
  patientName: {
    ...typography.bodySemibold,
  },
  doctorName: {
    ...typography.caption,
  },
  specialty: {
    ...typography.captionMedium,
    color: colors.primary,
  },

  // === DETALLES ===
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailIcon: {
    marginRight: spacing.lg,
    marginTop: 3,
  },
  detailText: {
    ...typography.body,
  },
  detailLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },

  // === ESTADÍSTICAS ===
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.small,
    textAlign: 'center',
    color: colors.text.secondary,
  },

  // === PERFILES ===
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.lg,
  },

  // === METADATOS ===
  metadataCard: {
    backgroundColor: colors.surfaceVariant,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metadataLabel: {
    ...typography.captionMedium,
    color: colors.text.secondary,
  },
  metadataValue: {
    ...typography.caption,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },

  // === ESTADOS VACÍOS ===
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    marginVertical: spacing.xl,
  },
  emptyStateText: {
    ...typography.h4,
    color: colors.text.secondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },

  // === ACCIONES RÁPIDAS ===
  quickActionCard: {
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    backgroundColor: colors.surface,
    width: '48%', // ✅ CAMBIO: de width: 90 a '48%'
    marginBottom: spacing.md, // ✅ AÑADIR: para el espaciado vertical
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.primary, // Ejemplo de fondo
  },
  quickActionText: {
    ...typography.smallMedium,
    textAlign: 'center',
    color: colors.text.secondary,
  },

  // === INFORMACIÓN DE CONTACTO ===
  contactInfo: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactText: {
    ...typography.caption,
  },

  // === AUTH SCREENS ===
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxxxl,
  },
  authForm: {
    gap: spacing.lg,
  },
  authLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  authLinkText: {
    ...typography.caption,
  },
  authLink: {
    ...typography.captionMedium,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
