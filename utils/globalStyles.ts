import { StyleSheet } from "react-native"

// === SISTEMA DE DISEÑO UNIFICADO ===
export const colors = {
  // Colores primarios
  primary: "#2563eb",
  secondary: "#16a34a",
  accent: "#dc2626",
  warning: "#ca8a04",
  purple: "#7c3aed",

  // Colores de superficie
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceVariant: "#f1f5f9",

  // Sistema de texto
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
    muted: "#94a3b8",
    inverse: "#ffffff",
  },

  // Bordes y divisores
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  borderDark: "#cbd5e1",

  // Estados semánticos
  success: "#dcfce7",
  successText: "#166534",
  successBorder: "#bbf7d0",

  pending: "#fef3c7",
  pendingText: "#92400e",
  pendingBorder: "#fde68a",

  error: "#fee2e2",
  errorText: "#991b1b",
  errorBorder: "#fecaca",

  info: "#eff6ff",
  infoText: "#2563eb",
  infoBorder: "#dbeafe",

  // Overlays y sombras
  overlay: "rgba(0, 0, 0, 0.5)",
  shadowColor: "#000000",
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
}

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
}

export const shadows = {
  sm: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
}

export const typography = {
  // Títulos
  h1: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: colors.text.primary,
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: colors.text.primary,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text.primary,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: colors.text.primary,
    lineHeight: 24,
  },

  // Texto del cuerpo
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodySemibold: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text.primary,
    lineHeight: 24,
  },

  // Texto pequeño
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  captionMedium: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  // Texto muy pequeño
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
    color: colors.text.muted,
    lineHeight: 16,
  },
  smallMedium: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: colors.text.muted,
    lineHeight: 16,
  },
}

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
    flexDirection: "row",
    alignItems: "center",
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rowEnd: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spaceAround: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  flex1: { flex: 1 },

  // === CABECERAS ===
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.sm,
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
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  cardCompact: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardFlat: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
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
    marginBottom: spacing.lg,
  },
  sectionTitleLarge: {
    ...typography.h3,
    marginBottom: spacing.xl,
  },

  // === BOTONES ===
  button: {
    flexDirection: "row",
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    ...shadows.sm,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonAccent: {
    backgroundColor: colors.accent,
  },
  buttonWarning: {
    backgroundColor: colors.warning,
  },
  buttonOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonGhost: {
    backgroundColor: "transparent",
  },

  // Texto de botones
  buttonText: {
    ...typography.bodySemibold,
    color: colors.text.inverse,
    marginLeft: spacing.sm,
  },
  buttonTextOutline: {
    ...typography.bodySemibold,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  buttonTextGhost: {
    ...typography.bodySemibold,
    color: colors.primary,
    marginLeft: spacing.sm,
  },

  // Botones especiales
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceVariant,
    ...shadows.sm,
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
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
    justifyContent: "center",
    ...typography.body,
  },
  inputFocused: {
    borderColor: colors.primary,
    ...shadows.sm,
  },
  inputError: {
    borderColor: colors.errorText,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  textInput: {
    flex: 1,
    ...typography.body,
    paddingVertical: spacing.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: spacing.lg,
  },

  // Acciones de formulario
  formActions: {
    flexDirection: "row",
    gap: spacing.lg,
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
  formButton: {
    flex: 1,
  },

  // === TYPOGRAPHY ===
  title: typography.h1,
  titleLarge: {
    ...typography.h1,
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
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
    borderRadius: borderRadius.full,
    marginRight: spacing.lg,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xxl,
  },
  avatarXLarge: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xxl,
  },

  // === BÚSQUEDA ===
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    height: 44,
    marginRight: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.md,
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
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  listItemContent: {
    flex: 1,
  },
  listItemActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginLeft: spacing.lg,
  },

  // === BOTONES DE ACCIÓN ===
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.sm,
  },

  // === BADGES Y ESTADOS ===
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  statusText: {
    ...typography.smallMedium,
    textTransform: "uppercase",
  },

  // === FILTROS ===
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadows.sm,
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
    padding: spacing.xl,
    ...shadows.md,
    marginBottom: spacing.md,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  appointmentDetails: {
    gap: spacing.xs,
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
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailIcon: {
    marginRight: spacing.lg,
    marginTop: 2,
  },
  detailText: {
    ...typography.body,
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },

  // === ESTADÍSTICAS ===
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.lg,
    width: "100%",
  },
  statItem: {
    alignItems: "center",
    minWidth: 80,
  },
  statNumber: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.small,
    textAlign: "center",
  },

  // === PERFILES ===
  profileSection: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
    paddingVertical: spacing.xl,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xl,
  },

  // === METADATOS ===
  metadataCard: {
    backgroundColor: colors.surfaceVariant,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  metadataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  metadataLabel: {
    ...typography.captionMedium,
  },
  metadataValue: {
    ...typography.caption,
    textAlign: "right",
    flex: 1,
    marginLeft: spacing.md,
  },

  // === ESTADOS VACÍOS ===
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xxxxl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.xl,
  },
  emptyStateText: {
    ...typography.bodySemibold,
    color: colors.text.secondary,
    marginTop: spacing.lg,
    textAlign: "center",
  },
  emptyStateSubtext: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.xs,
    textAlign: "center",
  },

  // === ACCIONES RÁPIDAS ===
  quickActionCard: {
    width: 80,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    marginRight: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  quickActionText: {
    ...typography.captionMedium,
    textAlign: "center",
  },

  // === INFORMACIÓN DE CONTACTO ===
  contactInfo: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  contactText: {
    ...typography.small,
  },

  // === AUTH SCREENS ===
  authContainer: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xxxl,
  },
  authHeader: {
    alignItems: "center",
    marginBottom: spacing.xxxxl,
  },
  authForm: {
    gap: spacing.xl,
  },
  authLinkContainer: {
    alignItems: "center",
    marginTop: spacing.xxxl,
  },
  authLinkText: {
    ...typography.caption,
  },
  authLink: {
    ...typography.captionMedium,
    color: colors.primary,
  },
})
