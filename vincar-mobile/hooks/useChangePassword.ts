import { useState } from "react";
import { api, HandledError } from "@/constants/api";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";

const useChangePassword = (resetToken: string | null) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleChangePassword = async () => {
      console.log("handleChangePassword chamado");

      console.log("newPassword:", newPassword);
      console.log("confirmNewPassword:", confirmNewPassword);
  
      if (newPassword !== confirmNewPassword) {
          Alert.alert("Erro", "As novas senhas não coincidem.");
          return;
      }
      console.log("resetToken:", resetToken); 

        if (!resetToken) {
          Alert.alert("Erro", "Token de recuperação inválido.");
          return;
        }

        console.log("resetToken recebido:", resetToken); 

        setLoading(true);
        try {
            const encodedResetToken = encodeURIComponent(resetToken);
            console.log("Enviando resetToken codificado:", encodedResetToken);

            console.log("URL da API:", `/auth/reset-password/${encodedResetToken}`);

            const response = await api.put(`/auth/reset-password/${encodedResetToken}`, {
                newPassword,
            });
            console.log("Resposta da API:", response);

            if (response && response.data) {
                console.log("Dados da resposta da API:", response.data);
            }

            Alert.alert("Sucesso", "Senha alterada com sucesso!");
            navigation.navigate("login");
        } catch (error) {
            console.error("Erro na API:", error);
            if ((error as any).response) {
                console.error("Resposta de erro da API:", (error as any).response.data);
            }
            HandledError(error as ErrorResponse);
        } finally {
            setLoading(false);
        }
    };

    return {
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        handleChangePassword,
        loading,
    };
};

export default useChangePassword;