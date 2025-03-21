// index.styles.js
import { StyleSheet } from "react-native";
import theme from '../styles/theme/theme'

export const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containertitle: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: theme.colors.primary, 
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  containeracesso: {
    width: "100%",
    alignItems: "center",
  },
  containerlogin: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: theme.colors.primary, 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textbutton: {
    color: theme.colors.onPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  containerregistrar: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  text: {
    color: theme.colors.primary, 
    fontSize: 16,
    fontWeight: "bold",
  },
});