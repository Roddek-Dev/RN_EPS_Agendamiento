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
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  bodySecondary: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  small: {
    fontSize: 12,
    color: colors.text.muted,
  },
};

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  // Inputs
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
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

  // Buttons
  button: {
    borderRadius: 8,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  buttonTextOutline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Search
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },

  // Headers
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    ...typography.caption,
  },

  // Lists
  listContainer: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  listItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemContent: {
    flex: 1,
  },
  listItemActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.lg,
  },

  // Status badges
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Typography
  title: typography.h1,
  subtitle: typography.h2,
  sectionTitle: typography.h3,
  itemTitle: typography.h4,
  body: typography.body,
  bodySecondary: typography.bodySecondary,
  caption: typography.caption,
  small: typography.small,

  // Avatars
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.lg,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.xxl,
  },

  // Empty states
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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

  // Forms
  formActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxxl,
  },
  formButton: {
    flex: 1,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxxl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});