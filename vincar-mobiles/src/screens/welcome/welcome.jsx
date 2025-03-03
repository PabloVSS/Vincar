// screens/welcome/welcome.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { styles } from './welcome.styles';

function Welcome(){

    const navigation = useNavigation();
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao App</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Criar Conta"
                    onPress={() => navigation.navigate('register')}
                    color="#007AFF"
                />
                <Button
                    title="Fazer Login"
                    onPress={() => navigation.navigate('login')}
                    color="#34C759"
                    style={styles.loginButton}
                />
            </View>
        </View>
    );
};



export default Welcome;