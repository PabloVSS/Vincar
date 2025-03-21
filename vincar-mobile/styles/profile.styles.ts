import { StyleSheet } from "react-native";
import theme from "./theme/theme";

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    textName: {
        fontSize: 24,
        fontWeight: "bold",
        justifyContent: 'center',
      color: theme.colors.primary,
      textAlign: 'center',

    },
    textEmail:{
      fontSize: 20,
      fontWeight: "bold", 
      color: theme.colors.primary,

    },
    cardTitle:{
      marginBottom: 50,
      justifyContent: 'center', 
      alignItems: 'center',
      color: theme.colors.primary,


    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: theme.colors.error,
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,

    },
    buttonText: {
        color: theme.colors.onPrimary,
        fontWeight: "bold",
    },
    outlineButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "transparent",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 0.2
    },
    outlineButtonText: {
        color: theme.colors.primary,
        fontWeight: "bold",

    },
    subTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
    },
    logoutButton: {
        backgroundColor: theme.colors.error,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
          color: theme.colors.onPrimary,
          fontWeight: "bold",
    },
    logoutButtonText: {
        color: theme.colors.onPrimary,
        fontWeight: "bold",
    },
    sectionText:{
        color: theme.colors.secondary,
        fontSize: 20,
        fontWeight: "bold", 
    }
});

export default styles;