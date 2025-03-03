import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api, HandledError } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { styles } from './register.styles';
import { MaskedTextInput } from 'react-native-mask-text';

function Register() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const authState = useSelector(state => state.auth);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleRegister = async () => {
        console.log("handleRegister chamado");

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            console.log("Erro: Senhas não coincidem");
            return;
        }

        if (!validateEmail(email)) {
            setError('Formato de email inválido.');
            console.log("Erro: Formato de email inválido");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        console.log("Iniciando registro...");
        console.log("Dados do registro:", { name, phone, email, password });

        try {
            const response = {
                data: {
                    token: 'simulated_token',
                    user: {
                        id: 1,
                        name: name.trim(),
                        email: email.trim().toLowerCase(),
                        phone: phone.replace(/\D/g, ''),
                    },
                },
            };

            console.log("Resposta simulada:", response);

            if (response.data) {
                console.log("Dados da resposta:", response.data);
                console.log("response.data antes do AsyncStorage", response.data);
                await AsyncStorage.setItem('userToken', response.data.token);
                console.log("Token armazenado:", await AsyncStorage.getItem('userToken'));

                dispatch(setCredentials({
                    token: response.data.token,
                    user: {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        email: response.data.user.email,
                        phone: response.data.user.phone,
                    },
                }));
                console.log("AuthState após dispatch:", useSelector(state => state.auth)); // Movido para cá
                console.log("Redux atualizado");

                setSuccess('Conta criada com sucesso!');
                console.log("Navegando para Home");
                setTimeout(() => {
                    navigation.navigate('home');
                }, 100);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Erro ao criar conta. Tente novamente.';
            setError(errorMessage);
            console.error('Erro no registro:', err);
            console.log("Erro na API:", err);
            HandledError(err);
        } finally {
            setLoading(false);
            console.log("Registro finalizado");
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome completo"
                value={name}
                onChangeText={setName}
                style={styles.input}
                autoCapitalize="words"
            />

            <MaskedTextInput
                mask="(99) 99999-9999"
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
            />

            <TextInput
                placeholder="Senha (mínimo 6 caracteres)"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                minLength={6}
            />

            <TextInput
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}

            <Button
                title={loading ? "Criando conta..." : "Criar Conta"}
                onPress={handleRegister}
                color="#007AFF"
                disabled={!name || !phone || !email || !password || !confirmPassword || loading}
            />

            <Button
                title="Já tem conta? Faça Login"
                onPress={() => navigation.navigate('login')}
                color="#666"
            />
        </View>
    );
}

export default Register;