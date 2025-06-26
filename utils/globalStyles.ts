
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563eb',
  secondary: '#16a34a',
  accent: '#dc2626',
  warning: '#ca8a04',
  purple: '#7c3aed',
  background: '#f8fafc',
  surface: '#ffffff',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    muted: '#94a3b8',
  },
  border: '#e2e8f0',
  success: '#dcfce7',
  successText: '#166534',
  pending: '#fef3c7',
  pendingText: '#92400e',
  error: '#fee2e2',
  errorText: '#991b1b',
  info: '#eff6ff',
  infoText: '#2563eb',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48, // Añadido para gaps más grandes
};



export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  // ... etc.
};
// --- HOJA DE ESTILOS GLOBAL ---
export const globalStyles = StyleSheet.create({
  // --- LAYOUTS FUNDAMENTALES ---
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, flexGrow: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1 : { flex: 1 },

  // --- CABECERAS DE PÁGINA (NUEVO PARA CRUDS) ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.background, // o colors.surface si prefieres blanco
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { ...typography.h3, color: colors.text.primary },
  headerSubtitle: { ...typography.caption, color: colors.text.secondary },

  // --- COMPONENTES GENÉRICOS ---
  // --- TARJETAS Y SECCIONES ---
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.h4, marginBottom: spacing.md },

  // --- BOTONES ---
  button: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonSecondary: { backgroundColor: colors.secondary },
  buttonOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
    marginLeft: spacing.sm,
  },
  buttonTextOutline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22, // Circular para un look más suave
    justifyContent: 'center',
    alignItems: 'center',
  },
  // NUEVO: Botón circular para FABs (Floating Action Button)
  circularButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- FORMULARIOS (NUEVO Y MEJORADO) ---
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  inputContainer: { marginBottom: spacing.lg },
  input: {
    // Estilo base para TextInput y para Views que parecen inputs
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    height: 52,
    justifyContent: 'center',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  inputIcon: { marginRight: spacing.md },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  formActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  formButton: {
    flex: 1,
  },

  // --- TYPOGRAPHY (Títulos, Textos) ---
  title: typography.h1,
  subtitle: {
    // Subtítulo ahora es un estilo, no un H2 directo
    fontSize: 18,
    color: colors.text.secondary,
  },

  itemTitle: typography.h4,
  caption: typography.caption,
  // ... (otros estilos de texto)

  // --- AVATAR ---
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.lg,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarLarge: {
    // Para perfiles, etc.
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.xxl,
  },

  // --- FILTROS (Visto en Reservas) ---
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: 8,
    gap: spacing.sm,
    borderColor: colors.border,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },

  // --- LISTAS DE CITAS (Visto en Reservas) ---
  appointmentsList: {
    gap: spacing.md,
  },
  appointmentCard: {
    // Es básicamente un 'card', pero lo mantenemos por si cambia
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appointmentDetails: {
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  doctorName: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  specialty: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 12, fontWeight: 'bold' },

  // --- LAYOUTS ESPECÍFICOS ---
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxxxl, // 48px
  },
  authForm: {
    gap: spacing.lg,
  },
  authLinkContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  authLinkText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  authLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  // --- LISTAS DE CRUD (NUEVO) ---
  listContainer: { gap: spacing.md },
  listItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md, // Nota: card usa spacing.lg, ajusta según necesites
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContent: { flex: 1 },
  listItemActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.md,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: spacing.lg,
    height: 44,
  },
  searchIcon: { marginRight: spacing.md },
  searchInput: { flex: 1, fontSize: 16, color: colors.text.primary },

  // --- PANTALLA DE DETALLES (NUEVO) ---
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  detailIcon: { marginRight: spacing.md },
  // Corregido: typography.body no existe, se usa typography.caption como base
  detailText: { fontSize: 16, color: colors.text.primary },
  detailLabel: { ...typography.caption },

  // --- SECCIONES Y OTROS ---
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.text.muted,
    marginTop: 4,
  },

  quickActionCard: {
    width: 80,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
});
