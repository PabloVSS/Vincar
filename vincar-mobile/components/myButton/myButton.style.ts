import { StyleSheet } from 'react-native';
import theme from "@/styles/theme/theme"; 
const styles = StyleSheet.create({
  btnPrimary: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: 20,
  },
  textOnPrimary: {
    color: theme.colors.onPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  btnSecondary: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    padding: 20,
  },
  textOnSecondary: {
    color: theme.colors.onSecondary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;