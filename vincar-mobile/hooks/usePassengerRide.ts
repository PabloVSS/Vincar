import  { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { api } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const usePassengerRide = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [pickupAddress, setPickupAddress] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [rideStatus, setRideStatus] = useState(null);
    const [rideId, setRideId] = useState(null);
    const [location, setLocation] = useState(null);
    const [driverName, setDriverName] = useState('');
    const [loading, setLoading] = useState(false);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const locationWatch = useRef<any>(null);
    const [isLocationReady, setIsLocationReady] = useState(false);
    const lastStatusRef = useRef<string | null>(null);
    const isMounted = useRef(true); 

    useEffect(() => {
        return () => {
            isMounted.current = false; 
        };
    }, []);


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const id = await AsyncStorage.getItem('userId');
                setUserId(id);

                if (id) {
                    await Promise.all([
                        checkExistingRide(id),
                        getCurrentLocation()
                    ]);
                }
                setIsLocationReady(true);
            } catch (error) {
                console.error('Erro no carregamento inicial:', error);
            } finally {
                setLoading(false);
            }
        };
        

        loadData();

        return () => {
            stopPolling();
            stopLocationUpdates();
        };
    }, []);

    useEffect(() => {
        if (rideId) {
            startPolling(rideId);
        }
        return () => {
            stopPolling();
        };
    }, [rideId]);

    const startLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão de localização negada');
            return;
        }
        locationWatch.current = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 10 },
            (locationData) => {
                setLocation({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        );
    };

    const stopLocationUpdates = () => {
        if (locationWatch.current) {
            locationWatch.current.remove();
            locationWatch.current = null;
        }
    };

    const checkExistingRide = async (id) => {
        if (!id) return;
    
        try {
            console.log(`checkExistingRide - Fazendo requisição para /rides/passenger/${id}/pendents`);
            const response = await api.get(`/rides/passenger/${id}/pendents`);
            console.log('checkExistingRide - Resposta:', response.data);
    
            if (response.data.success) {
                const activeRide = response.data?.data?.find(ride =>
                    ['P', 'A'].includes(ride.status)
                );
    
                if (activeRide) {
                    console.log('Corrida ativa encontrada:', activeRide);
                    setPickupAddress(activeRide.pickup_address || '');
                    setDropoffAddress(activeRide.dropoff_address || '');
                    setRideId(activeRide.id);
                    setRideStatus(activeRide.status);
                } else {
                    console.log('Nenhuma corrida ativa encontrada');
                    setRideId(null);
                    setRideStatus(null);
                }
            } else {
                // Adicionado log para indicar que não há corridas pendentes
                console.log('checkExistingRide - Nenhuma corrida pendente encontrada.');
                setRideId(null);
                setRideStatus(null);
            }
        } catch (error) {
            // Tratar outros erros de requisição, se necessário
            console.error('checkExistingRide - Erro na requisição:', error);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão de localização negada');
            return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });

        try {
            let address = await Location.reverseGeocodeAsync({
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
            });

            if (address && address.length > 0) {
                const { street, district } = address[0];
                if (!rideId) {
                    setPickupAddress(`${street}, ${district}`);
                }
            }

        } catch (error) {
            console.error('Erro ao obter endereço:', error);
            Alert.alert('Erro ao obter endereço.');
        } finally {
            setIsLocationReady(true);
        }

    };

    const createRide = async () => {
        if (rideId) {
            Alert.alert('Você já tem uma corrida em andamento.');
            return;
        }

        try {
            setLoading(true);
            const response = await api.post('/rides', {
                pickup_address: pickupAddress,
                dropoff_address: dropoffAddress,
                pickup_latitude: location?.latitude,
                pickup_longitude: location?.longitude,
            });

            const newRideId = response.data.data?.id || response.data.id;
            console.log('createRide - response:', response.data);
            lastStatusRef.current = null; // Reset ao cancelar

            if (newRideId) {
                setRideStatus('P');
                setRideId(newRideId);
                Alert.alert('Corrida solicitada com sucesso!');
                startPolling(newRideId);
                await checkExistingRide(userId);
            }
        } catch (error) {
            console.error('Erro ao solicitar corrida:', error);
            Alert.alert('Erro ao solicitar corrida.');
        } finally {
            setLoading(false);
        }
    };

    const cancelRide = async () => {
        console.log('Tentando cancelar corrida ID:', rideId);

        if (!rideId) {
            Alert.alert('Nenhuma corrida para cancelar.');
            return;
        }
        setAlertShown(false);
        setLastRideStatus(null);

        try {
            setLoading(true);
            await api.put(`/rides/${rideId}/cancel`);
            setRideStatus(null);
            setDriverName('');
            setRideId(null);
            setDropoffAddress('');
            getCurrentLocation();
            stopPolling();
            Alert.alert('Corrida cancelada!');
        } catch (error) {
            console.error('Erro ao cancelar corrida:', error);
            Alert.alert('Erro ao cancelar corrida.');
        } finally {
            setLoading(false);
        }
    };

    const finishedRide = async () => {
        if (!rideId) {
            Alert.alert('Nenhuma corrida para confirmar.');
            return;
        }
        lastStatusRef.current = null; // Reset ao cancelar

        try {
            setLoading(true);
            await api.put(`/rides/${rideId}/finish`);
            setRideStatus(null);
            setRideId(null);
            setDropoffAddress('');
            getCurrentLocation();
            Alert.alert('Corrida Finalizada com sucesso!');
            stopPolling();
        } catch (error) {
            console.error('Erro ao finalizar corrida:', error);
            Alert.alert('Erro ao finalizar corrida.');
        } finally {
            setLoading(false);
        }
    };

    const startPolling = (rideId: string) => {
        stopPolling(); 
        
        fetchRideStatus(rideId);
        
        pollingInterval.current = setInterval(() => {
            if (isMounted.current) {
                fetchRideStatus(rideId);
            }
        }, 5000); // Intervalo aumentado para 5s
    };


    const stopPolling = () => {
        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
            pollingInterval.current = null;
        }
    };

    const fetchRideStatus = async (rideId: string) => {
        if (!rideId || !isMounted.current) return;

        try {
            const response = await api.get(`/rides/${rideId}`);
            const rideData = response.data.data || response.data;
            
            if (rideData?.status && isMounted.current) {
                const currentStatus = rideData.status;
                const previousStatus = lastStatusRef.current;

                console.log('Status:', {
                    previous: previousStatus,
                    current: currentStatus
                });

                if (currentStatus !== rideStatus) {
                    setRideStatus(currentStatus);
                }

                if (currentStatus === 'A' && previousStatus !== 'A') {
                    Alert.alert('Corrida Aceita!', 'Motorista a caminho');
                    setDriverName(rideData.driver?.name || 'Motorista');
                }

                lastStatusRef.current = currentStatus;
            }
        } catch (error) {
            console.error('Erro ao verificar status:', error);
        }
    };

    
    



    return {
        driverName,
        pickupAddress,
        setPickupAddress,
        dropoffAddress,
        setDropoffAddress,
        rideStatus,
        rideId,
        createRide,
        cancelRide,
        finishedRide,
        location,
        loading: loading || !isLocationReady,
    };
};

