import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";

interface DecodedToken {
    userId: string;
    name: string;
    email: string;
}

interface Notifications {
    push: boolean;
    email: boolean;
    sms: boolean;
}

const useProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editing, setEditing] = useState(false);
    const [notifications, setNotifications] = useState<Notifications>({
        push: true,
        email: false,
        sms: true,
    });

    const navigation = useNavigation();

    useEffect(() => {
      const loadUserData = async () => {
          try {
              const storedName = await AsyncStorage.getItem("userName");
              const storedEmail = await AsyncStorage.getItem("userEmail");

              if (storedName && storedEmail) {
                  setName(storedName);
                  setEmail(storedEmail);
              } else {
                  const token = await AsyncStorage.getItem("userToken");
                  if (token) {
                      try {
                          const decoded: { name: string; email: string } = jwtDecode(token);
                          setName(decoded.name);
                          setEmail(decoded.email);
                      } catch (decodeError) {
                          console.error("Erro ao decodificar token:", decodeError);
                          Alert.alert("Erro", "Token inválido.");
                          handleLogout();
                      }
                  } else {
                      Alert.alert("Erro", "Nenhum usuário logado.");
                  }
              }
          } catch (error) {
              console.error("Erro ao carregar usuário:", error);
          }
      };

      loadUserData();
  }, []);


    const toggleNotification = (type: keyof Notifications) => {
        setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userId");
        navigation.navigate("login");
    };

    return {
        name,
        setName,
        email,
        setEmail,
        editing,
        setEditing,
        notifications,
        toggleNotification,
        handleLogout,
    };
};

export default useProfile;