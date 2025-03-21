import { StyleSheet } from "react-native";
import theme from "./theme/theme";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f4f4f4', 
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
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 0.2,

  },

  icon: {
    marginRight: 10,
    fontSize: 24,
    color: theme.colors.primary
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: theme.colors.primary

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
  error: {
      color: '#dc3545', 
      marginBottom: 10,
      textAlign: 'center',
  },
  success: {
      color: '#28a745', 
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 18,
  },
});

export default styles;