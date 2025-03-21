import { StyleSheet } from 'react-native';
import theme from './theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

    title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 32,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surfaceContainerHighest,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.surfaceContainerLowest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  icon: {
    marginRight: 10,
    color: theme.colors.onSurfaceVariant
  },
  input: {
    flex: 1,
    height: 48,
    color: theme.colors.onSurfaceVariant,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
    color: theme.colors.onSurfaceVariant, 
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: theme.colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',

  },
  forgotPasswordContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPassword: {
    color: theme.colors.primary,

  },
 
});