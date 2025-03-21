import { Link, useNavigation } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/index.styles";
import Login from "./login";
import Registrar from "./register";
import { useTheme } from "@react-navigation/native";

const Index = () => {
  const theme = useTheme();

  const navigation = useNavigation(); 

  const handleLogin = () => {
    navigation.navigate('login');
  };



  return (
       <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.containerPrincipal}>
        
          <View style={styles.containertitle}>
            <Text style={styles.title}>VINCAR</Text>
          </View>

      
          <View style={styles.containeracesso}>
    
            <View style={styles.containerlogin}>
              <TouchableOpacity style={styles.button} 
              accessible={true} 
              accessibilityLabel="login"
              onPress={handleLogin}

              >
                <Text style={styles.textbutton}>Login</Text>
              </TouchableOpacity>
            </View>

          
            <View style={styles.containerregistrar}>
            <Link href="/register">
              <Text>
                Ainda não tem conta?{" "}
                  <Text style={styles.text}
                  >Cadastre aqui</Text>
              </Text>
              </Link>
            </View>
          </View>
        </View>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Index;
