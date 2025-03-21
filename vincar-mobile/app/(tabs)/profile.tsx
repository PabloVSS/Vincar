import useProfile from "@/hooks/useProfile";
import React from "react";
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import styles from "@/styles/profile.styles";

const Profile = () => {
    const {
        name,
        email,
        notifications,
        toggleNotification,
        handleLogout,
    } = useProfile();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
             

                <View style={styles.cardTitle}>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.textEmail}>{email}</Text>
                </View>

                <View style={styles.card}>
                  
                    <Text style={styles.sectionTitle}>Configurações de Conta</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.outlineButton]}
                        onPress={() => Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento")}
                    >
                        <Text style={styles.outlineButtonText}>Alterar Dados Pessoais</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.outlineButton]}
                        onPress={() => Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento")}
                    >
                        <Text style={styles.outlineButtonText}>Alterar Senha</Text>
                    </TouchableOpacity>

                    
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Suporte e Ajuda</Text>
                    <TouchableOpacity style={[styles.button, styles.outlineButton]}>
                        <Text style={styles.outlineButtonText}>Central de Ajuda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.outlineButton]}>
                        <Text style={styles.outlineButtonText}>Contato com o Suporte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.outlineButton]}>
                        <Text style={styles.outlineButtonText}>Relatar um Problema</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Desenvolvedor</Text>
                    <Text style={styles.sectionText}>Pablo Vinícius Sousa Silva</Text>
                </View>

                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;