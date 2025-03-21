import React, { useState } from "react";
import { Text, TextInput, Button, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MyButton from "../myButton/myButton";
import styles from "../requestform/RideComponent.style";

type RideComponentProps = {
    rideId: string | null;
    rideStatus: null | 'P' | 'A';
    pickupAddress: string;
    dropoffAddress: string;
    driverName: string;
    passengerName: string;
    rideDate: string;
    setPickupAddress: (address: string) => void;
    setDropoffAddress: (address: string) => void;
    createRide: () => void;
    cancelRide: () => void;
    acceptRide: () => void;
    finishRide: () => void;
    loading: boolean;
    error: string | null;
};

const RideComponent = ({
    rideId,
    rideStatus,
    pickupAddress,
    dropoffAddress,
    driverName,
    passengerName,
    rideDate,
    setPickupAddress,
    setDropoffAddress,
    createRide,
    cancelRide,
    acceptRide,
    finishRide,
    loading,
    error,
}: RideComponentProps) => {

    const [userLocation, setUserLocation] = useState({
        latitude: -15.123,
        longitude: -48.123,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    if (rideId === null) {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={userLocation}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    <Marker coordinate={userLocation}>
                        <View style={styles.locationIcon}>
                            <View style={styles.locationDot} />
                        </View>
                    </Marker>
                </MapView>
                <TextInput
                    style={styles.input}
                    placeholder="Endereço de Partida"
                    value={pickupAddress}
                    onChangeText={setPickupAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Endereço de Destino"
                    value={dropoffAddress}
                    onChangeText={setDropoffAddress}
                />
                <Button title="Solicitar Corrida" onPress={createRide} color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={userLocation}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <Marker coordinate={userLocation}>
                    <View style={styles.locationIcon}>
                        <View style={styles.locationDot} />
                    </View>
                </Marker>
            </MapView>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Detalhes da Corrida
                </Text>
                {rideStatus === 'A' && <Text>Motorista: {driverName}</Text>}
                <Text>Origem: {pickupAddress}</Text>
                <Text>Destino: {dropoffAddress}</Text>
                <Text>Data: {rideDate}</Text>

                {rideStatus === null && <MyButton text="CONFIRMAR" onPress={createRide} />}
                {rideStatus === 'P' && <MyButton text="CANCELAR" onPress={cancelRide} theme="secondary" />}
                {rideStatus === 'P' && <MyButton text="ACEITAR" onPress={acceptRide} />}
                {rideStatus === 'A' && <MyButton text="FINALIZAR CORRIDA" onPress={finishRide} theme="secondary" />}
            </View>
        </View>
    );
};

export default RideComponent;