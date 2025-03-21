import React, { useState } from 'react';
import useResetPassword from '@/hooks/useResetPassword';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from 'expo-router';
import styles from '@/styles/resetPassword.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResetPassword = () => { 
      const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const { loading, error, success, generateResetToken, generatedToken } = useResetPassword();
    const [resetStage, setResetStage] = useState<'email' | 'token' | 'success'>('email');

    const handleGenerateToken = async () => {
        try {
          const token = await generateResetToken(email);
          if (token) {
            setResetStage('token');
            navigation.navigate('resetPasswordForm', { generatedToken: token });
          }
        } catch {
        }
      };

    if (resetStage === 'email') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Solicitar Reset de Senha</Text>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.inputContainer}>
                   <MaterialCommunityIcons name="email-outline"  style={styles.icon} />
                   <TextInput
                     style={styles.input}
                     placeholder="seu@email.com"
                     placeholderTextColor="#999"
                     keyboardType="email-address"
                     value={email}
                     onChangeText={setEmail}
                   />
                 </View>
                <TouchableOpacity style={styles.button} onPress={handleGenerateToken} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return null;
};




export default ResetPassword;