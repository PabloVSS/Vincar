import { useState } from 'react';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, HandledError } from '@/constants/api';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password,
            });

            console.log('API Response:', response.data);

            const { token, user } = response.data;

            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userId', userId);

                if (user && user.name && user.email) {
                    await AsyncStorage.setItem('userName', user.name);
                    await AsyncStorage.setItem('userEmail', user.email);
                } else {
                    console.warn("Objeto 'user' ausente ou incompleto na resposta da API.");
                    const decoded = jwtDecode(token);
                    await AsyncStorage.setItem('userName', decoded.name);
                    await AsyncStorage.setItem('userEmail', decoded.email);
                }

                console.log('Navegando com userId:', userId);
                navigation.navigate('(tabs)');
            } else {
                console.error('Token não encontrado na resposta da API.');
                HandledError({ response: { data: { error: 'Token não encontrado no login.' } } });
                Alert.alert('Erro de Login', 'Token não encontrado, verifique suas credenciais.');
                return;
            }
        } catch (error) {
            console.error('Erro no login:', error);
            HandledError(error);
            Alert.alert('Erro de Login', 'Falha ao realizar login, verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        senhaVisivel,
        setSenhaVisivel,
        handleLogin,
        loading,
    };
};

export default useLogin;