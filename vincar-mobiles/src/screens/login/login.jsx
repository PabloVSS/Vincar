import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, HandledError } from '../../constants/api'; // Adicione HandledError
import { setCredentials } from '../../features/auth/authSlice';

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await api.post('/auth/login', {
                email: email.trim().toLowerCase(),
                password
            });

            if (response.data) {
                await AsyncStorage.setItem('userToken', response.data.token);
                
                dispatch(setCredentials({ 
                    token: response.data.token,
                    user: response.data.user
                }));
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Credenciais inválidas ou problema de conexão';
            setError(errorMessage);
            HandledError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                autoComplete="password"
            />
            
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
            {isLoading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <Button
                    title="Entrar"
                    onPress={handleLogin}
                    color="#007AFF"
                    disabled={!email || !password}
                />
            )}
            
            <Button
                title="Criar nova conta"
                onPress={() => navigation.navigate('Register')}
                color="#666"
                style={styles.registerButton}
            />
        </View>
    );
};

export default Login;