import React from 'react';
import { Text, TextInput, View } from "react-native";
import MyButton from '../myButton/myButton';
import { styles } from './rideCard.styles';

interface RideCardProps {
    pickupAddress: string;
    setPickupAddress: (address: string) => void;
    dropoffAddress: string;
    setDropoffAddress: (address: string) => void;
    rideStatus: 'P' | 'A' | 'F' | null | undefined;
    driverName: string;
    createRide: () => void;
    cancelRide: () => void;
    finishedRide: () => void;
}

const RideCard: React.FC<RideCardProps> = ({ pickupAddress, setPickupAddress, dropoffAddress, setDropoffAddress, rideStatus, driverName, createRide, cancelRide, finishedRide }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Encontre a sua carona</Text>
            <View style={styles.footerFields}>
                <Text style={styles.titleinput}>Origem</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPickupAddress}
                    editable={rideStatus === null}
                >
                    {pickupAddress}
                </TextInput>
            </View>
            <View style={styles.footerFields}>
                <Text style={styles.titleinput}>Destino</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDropoffAddress}
                    editable={rideStatus === null}
                >
                    {dropoffAddress}
                </TextInput>
            </View>
            {rideStatus === 'A' && (
                <View style={styles.footerFields}>
                    <Text style={styles.titleinput}>Motorista</Text>
                    <TextInput style={styles.input} value={driverName} editable={false} />
                </View>
            )}
            
            {rideStatus === null && (
                <MyButton text="CONFIRMAR" onPress={createRide} />
            )}
            {rideStatus === 'P' && (
                <MyButton text="CANCELAR" onPress={cancelRide} theme="secondary" />
            )}
            {rideStatus === 'A' && (
                <MyButton text="FINALIZAR CARONA" onPress={finishedRide} theme="secondary" />
            )}
        </View>
    );
};

export default RideCard;