import { StyleSheet } from "react-native";
import theme from "./theme/theme";

export const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  map: {
      flex: 1,
      width: "100%"
  },
  marker: {
      width: 60,
      height: 60
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.card,
    borderRadius: 5,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  footerFields: {
      margin: 15
  },
  cardText: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: 32,
        textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 10,
    textAlign: 'center',
    
  },
  input: { 
    backgroundColor: theme.colors.secondary, 
    borderWidth: 1,
    borderBottomColor: theme.colors.border,
    color: theme.colors.onSecondary,
    borderRadius: 5,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
  titleinput: {
    marginBottom: 10,
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    
  
    
  }

});

