import { StyleSheet } from "react-native";
import theme from "./theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  titleContainer:{
    margin: 20,
    color: theme.colors.primary
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: theme.colors.primary,
    textAlign: "center"
  },
  toggleContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 16,
  },
  toggleButton: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderColor: theme.colors.primary,
  },
  activeButton: { 
    backgroundColor: theme.colors.primary,
    borderBottomWidth: 2,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderColor: theme.colors.primary,
   },
  toggleText: { 
    fontSize: 16, 
    color: theme.colors.primary
   },
  activeText: { 
    fontWeight: "bold" ,
    color: theme.colors.onPrimary

  },
  
  card: { 
    padding: 12, 
    backgroundColor: theme.colors.card, 
    borderRadius: 8, 
    marginBottom: 10, 
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 5,
    shadowRadius: 1,
    elevation: 5,
   },
  text: { 
    fontSize: 16, 
    color: theme.colors.text
   },
  label: { 
    fontWeight: "bold",
    color: theme.colors.primary
  },
  error: { 
    color: "red", 
    fontSize: 16, 
    textAlign: "center", 
    marginTop: 20 },
  empty: { 
    fontSize: 16, 
    textAlign: "center", 
    marginTop: 20 },
});

export default styles;