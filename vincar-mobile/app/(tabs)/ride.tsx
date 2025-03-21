import React, { useState, useEffect } from 'react';
import useRides from "@/hooks/useRides";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from '../../styles/ride.styles';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '@/styles/theme/theme';

type RootStackParamList = {
    ridesDetail: { rideId: string };
};

interface Ride {
    id: string;
    status: 'P' | 'A' | 'F' | 'C';
    passenger?: {
        name: string;
    };
    passenger_user_id?: string;
    pickup_address: string;
    dropoff_address: string;
}

function Ride() {
    const [refreshing, setRefreshing] = useState(false);
    const { rides, loading, error, fetchRides, fetchAcceptedRide } = useRides({ statusFilter: 'P' });    
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleRidePress = (ride: Ride) => {
        console.log('Navegando para detalhes da corrida pendente:', ride.id);
        navigation.navigate("ridesDetail", { rideId: ride.id });
    };

    const renderItem = ({ item }: { item: Ride }) => (
        <TouchableOpacity
            style={styles.ride}
            onPress={() => handleRidePress(item)}
        >
            <View style={styles.containerName}>
                <MaterialCommunityIcons name="car" size={24} color={theme.colors.surface} style={styles.icon} />
                <Text style={styles.name}>
                    {item.passenger?.name}
                </Text>
            </View>
            <Text style={styles.address} numberOfLines={1}>
                {item.pickup_address}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
                {item.dropoff_address}
            </Text>
        </TouchableOpacity>
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchRides();
        setRefreshing(false);
    };

    useEffect(() => {
        const checkAcceptedRide = async () => {
            const acceptedRide = await fetchAcceptedRide();
            if (acceptedRide) {
                navigation.navigate("ridesDetail", { rideId: acceptedRide.id });
            } else {
                handleRefresh();
            }
        };

        checkAcceptedRide();
    }, []);

    useEffect(() => {
        if (!loading) {
            handleRefresh(); 
        }
    }, [rides]); 

    if (loading && !refreshing) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Erro ao carregar corridas.</Text>;
    }

    if (!Array.isArray(rides)) {
        return <Text>Dados de corridas inválidos.</Text>;
    }

    const filteredRides = rides.filter(ride => ride.status !== 'F'); 
    return (
        <FlatList
            data={filteredRides} 
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onRefresh={handleRefresh}
            refreshing={refreshing}
        />
    );
}

export default Ride;