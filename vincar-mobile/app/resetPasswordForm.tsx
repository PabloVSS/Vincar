import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import useResetPassword from '@/hooks/useResetPassword';
import styles from '@/styles/resetPasswordForm.styles';

type RootStackParamList = {
  resetPasswordForm: {
    generatedToken: string;
  };
};

type ResetPasswordFormRouteProp = RouteProp<RootStackParamList, 'resetPasswordForm'>;

const ResetPasswordForm = () => {
  const navigation = useNavigation();
  const route = useRoute<ResetPasswordFormRouteProp>();
  const { generatedToken } = route.params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, success, resetPassword } = useResetPassword();
  const [resetStage, setResetStage] = useState<'token' | 'success'>('token');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
      if (!generatedToken) {
          setLocalError('Token inválido ou expirado');
          setTimeout(() => navigation.goBack(), 3000);
      }
  }, []);

  useEffect(() => {
      if (success) {
          console.log('Senha resetada com sucesso no form!');
          setResetStage('success');
          setTimeout(() => {
              console.log('Navegando para login...');
              navigation.navigate('login');
          }, 3000);
      }
  }, [success]);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleResetPassword = async () => {
      try {
          await resetPassword(generatedToken, newPassword);
      } catch (err) {
          setLocalError((err instanceof Error ? err.message : 'Erro desconhecido') || 'Erro ao resetar senha');
      }
  };



  if (resetStage === 'token') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Resetar Senha</Text>
        
        {localError && <Text style={styles.error}>{localError}</Text>}
        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons 
            name="lock" 
            style={styles.icon} 
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={toggleShowPassword} >
            <MaterialCommunityIcons 
              name={showPassword ? 'eye-off' : 'eye'} 
              style={styles.icon}        
                  />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons 
            name="lock" 
            style={styles.icon} 
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Nova Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <MaterialCommunityIcons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={20} 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleResetPassword} 
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Resetando...' : 'Resetar Senha'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Senha Resetada com Sucesso!</Text>
      <Text style={styles.success}>Redirecionando para o login...</Text>
    </View>
  );
};

export default ResetPasswordForm;