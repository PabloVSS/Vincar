import { StyleSheet } from "react-native";
import theme from "./theme/theme";

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.colors.background
  },
  icon:{
        marginRight: 10,
        color: theme.colors.onSurfaceVariant

  },
  name: {
      fontSize: 17,
      fontWeight: "bold",
      color: theme.colors.primary
  },
  address: {
      fontSize: 14,
      color: theme.colors.secondary
  },
  car: {
      width: 20,
      height: 20,
      margin: 3
  },
  containerName: {
      flexDirection: "row"
  },
  ride: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      
  }
});

