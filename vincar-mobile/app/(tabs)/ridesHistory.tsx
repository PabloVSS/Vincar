import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useRides from "@/hooks/useRides";
import styles from "@/styles/ridesHistory.styles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const RidesHistory: React.FC = () => {
  const [userRole, setUserRole] = useState<"passenger" | "driver">("passenger");
  const { rides, loading, error } = useRides({ role: userRole });

  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>

    <View style={styles.titleContainer}>
        <Text style={styles.title}>
            Histórico de Corridas ({userRole === "passenger" ? "Passageiro" : "Motorista"})
        </Text>
    </View>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userRole === "passenger" && styles.activeButton]}
          onPress={() => setUserRole("passenger")}
        >
          <Text style={[styles.toggleText, userRole === "passenger" && styles.activeText]}>
            Passageiro
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, userRole === "driver" && styles.activeButton]}
          onPress={() => setUserRole("driver")}
        >
          <Text style={[styles.toggleText, userRole === "driver" && styles.activeText]}>
            Motorista
          </Text>
        </TouchableOpacity>
      </View>

    
      {loading ? (
        <ActivityIndicator size="large"  />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : rides.length === 0 ? (
        <Text style={styles.empty}>Nenhuma corrida encontrada.</Text>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>
                <Text style={styles.label}>Origem:</Text> {item.pickup_address}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Destino:</Text> {item.dropoff_address}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Data:</Text> {new Date(item.pickup_date).toLocaleString()}
              </Text>
              {userRole === "passenger" && item.driver && (
                <Text style={styles.text}>
                  <Text style={styles.label}>Motorista:</Text> {item.driver.name} ({item.driver.phone})
                </Text>
              )}
              {userRole === "driver" && item.passenger && (
                <Text style={styles.text}>
                  <Text style={styles.label}>Passageiro:</Text> {item.passenger.name} ({item.passenger.phone})
                </Text>
              )}
            </View>
          )}
        />
      )}
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default RidesHistory;
