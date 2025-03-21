import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { styles } from '../styles/rideDetail.styles';
import MyButton from '@/components/myButton/myButton';
import { useRoute, useNavigation } from '@react-navigation/native';
import useRideDetail from '../hooks/useRideDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Ride {
    pickup_latitude: number | null;
    pickup_longitude: number | null;
    pickup_address: string | null;
    dropoff_address: string | null;
    pickup_date: string | null;
    status: string | null;
    passenger?: {
        name: string;
        phone?: string;
    } | null;
}

interface UseRideDetailResult {
    loading: boolean;
    error: { message: string } | null;
    ride: Ride | null;
    title: string | null;
    acceptRide: () => void;
    cancelRide: () => void;
    finishedRide: () => void; 
}

interface InfoRowProps {
    label: string;
    value: string | null;
}

interface RidesDetailRouteParams {
    rideId: string;
}

type RidesDetailRouteProp = RouteProp<{ params: RidesDetailRouteParams }, 'params'>;

function RidesDetail(props: {}): JSX.Element {
    const route = useRoute<RidesDetailRouteProp>();
    const navigation = useNavigation();
    const { rideId } = route.params;
    const [userId, setUserId] = useState<string | null>(null);
    const [localRide, setLocalRide] = useState<Ride | null>(null); // Estado local para a corrida

    useEffect(() => {
        const getUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            setUserId(storedUserId || '');
        };
        getUserId();
    }, []);

    const { loading, error, ride, title, acceptRide, finishedRide }: UseRideDetailResult = useRideDetail(rideId, userId, navigation);

    useEffect(() => {
        if (ride) {
            setLocalRide(ride); // Atualiza o estado local quando o hook retorna a corrida
        }
    }, [ride]);

    const handleAcceptRide = async () => {
        await acceptRide();
        setLocalRide(prev => prev ? {...prev, status: 'A'} : null);
    };



    const handleFinishRide = () => {
        finishedRide();
        setLocalRide((prevRide) => {
            if (prevRide) {
                return { ...prevRide, status: 'F' };
            }
            return prevRide;
        });
        navigation.navigate('rides');
    };

    const safePassenger = localRide?.passenger || {
        name: 'Passageiro não identificado',
        phone: 'Telefone não disponível'
    };

    const safeTitle = title || `${safePassenger.name} - ${safePassenger.phone}`;
    const shouldRender = localRide && !loading && !error;

    const hasValidCoordinates = localRide?.pickup_latitude && localRide?.pickup_longitude;
    const initialRegion = hasValidCoordinates ? {
        latitude: Number(localRide.pickup_latitude),
        longitude: Number(localRide.pickup_longitude),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
    } : null;

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Erro ao carregar detalhes</Text>
                <Text style={styles.errorSubtext}>{error.message || 'Tente novamente mais tarde'}</Text>
            </View>
        );
    }

    if (!localRide) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.noRidesText}>Corrida não encontrada</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={styles.container}>
                    {localRide.pickup_latitude && localRide.pickup_longitude ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: localRide.pickup_latitude,
                                longitude: localRide.pickup_longitude,
                                latitudeDelta: 0.004,
                                longitudeDelta: 0.004,
                            }}>
                            <Marker
                                coordinate={{
                                    latitude: localRide.pickup_latitude,
                                    longitude: localRide.pickup_longitude,
                                }}
                                title={safePassenger.name}
                                description={localRide.pickup_address}
                            />
                        </MapView>
                    ) : (
                        <View style={styles.mapPlaceholder}>
                            <Text>Localização indisponível</Text>
                        </View>
                    )}

                    <View style={styles.card}>
                        <Text style={styles.title}>
                            {safePassenger.name}
                        </Text>

                        <View style={styles.footerFields}>
                            <Text style={styles.titleinput}>Origem</Text>
                            <TextInput
                                style={styles.input}
                                editable={true}
                            >
                                {localRide.pickup_address}
                            </TextInput>
                        </View>

                        <View style={styles.footerFields}>
                            <Text style={styles.titleinput}>Destino</Text>
                            <TextInput
                                style={styles.input}
                                editable={true}
                            >
                                {localRide.dropoff_address}
                            </TextInput>
                        </View>

                        <View style={styles.footerFields}>
                            <Text style={styles.titleinput}>Data</Text>
                            <TextInput
                                style={styles.input}
                                editable={true}
                            >
                                {new Date(localRide.pickup_date || '').toLocaleString()}
                            </TextInput>
                        </View>

                        {localRide.status === "P" && (
                            <MyButton
                                text="ACEITAR"
                                theme="success"
                                onPress={handleAcceptRide}
                            />
                        )}
                        {localRide.status === "A" && (
                            <MyButton
                                text="FINALIZAR"
                                theme="danger"
                                onPress={handleFinishRide} // Coloque a função de finalizar aqui
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value || 'N/A'}</Text>
    </View>
);

export default RidesDetail;


