// Registrar.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/registrar.styles";
import { Link } from "expo-router";
import useRegister from '../hooks/useRegister'; // Ajuste o caminho

export default function Register() {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    senhaVisivel,
    setSenhaVisivel,
    handleRegister,
    loading,
  } = useRegister();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account-outline"  style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" style={styles.icon} />
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
          <MaterialCommunityIcons name="phone-outline"  style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha"
            
            secureTextEntry={!senhaVisivel}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={senhaVisivel ? "eye-off-outline" : "eye-outline"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Já tem uma conta? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.forgotLogin}>Faça login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}