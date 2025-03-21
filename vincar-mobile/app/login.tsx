import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/login.styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useLogin from '../hooks/useLogin'
import theme from "../styles/theme/theme";
import { useNavigation } from 'expo-router';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    senhaVisivel,
    setSenhaVisivel,
    handleLogin,
    loading,
  } = useLogin();

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} >
        <View style={styles.container}>

          <View style={styles.card}>
            
            <Text style={styles.title}>Faça Login</Text>

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
                 
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                secureTextEntry={!senhaVisivel}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                
              >
                <MaterialCommunityIcons
                  name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.forgotPasswordContainer}
                 onPress={() => navigation.navigate('resetPassword')}
            >     
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;