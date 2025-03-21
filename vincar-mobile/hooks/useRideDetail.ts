import { api } from '@/constants/api';
import HandleError from '@/constants/HandleError';
import { useState, useEffect } from 'react';

interface Passenger {
    name: string;
    phone?: string;
}

interface Ride {
    id: string;
    passenger_user_id: string;
    passenger: Passenger;
    pickup_address: string;
    dropoff_address: string;
    pickup_latitude: number;
    pickup_longitude: number;
    status: string;
    pickup_date: string;
}

interface UseRideDetailReturn {
    loading: boolean;
    error: Error | null;
    ride: Ride | null;
    title: string;
    fetchRideDetail: () => Promise<void>;
    acceptRide: () => Promise<void>;
    cancelRide: () => Promise<void>;
    finishedRide: () => Promise<void>;
}

const useRideDetail = (rideId: string, userId: string, navigation: any): UseRideDetailReturn => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [ride, setRide] = useState<Ride | null>(null);
    const [title, setTitle] = useState('');

    const fetchRideDetail = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/rides/${rideId}`);
            console.log('useRideDetail: API Response:', response.data);

            if (response.status === 404) {
                console.error('useRideDetail: Corrida não encontrada (404)');
                setError(new Error('Corrida não encontrada.'));
            } else if (response.data && response.data.data) { // Verifica se response.data e response.
                const rawData = response.data.data;

                if (rawData && rawData.id) {
                    const processedData: Ride = {
                        id: rawData.id,
                        passenger_user_id: rawData.passenger_user_id,
                        passenger: {
                            name: rawData.passenger?.name || 'Passageiro não identificado',
                            phone: rawData.passenger?.phone || 'N/A'
                        },
                        pickup_address: rawData.pickup_address || 'Endereço não disponível',
                        dropoff_address: rawData.dropoff_address || 'Destino não disponível',
                        pickup_latitude: rawData.pickup_latitude,
                        pickup_longitude: rawData.pickup_longitude,
                        status: rawData.status,
                        pickup_date: rawData.pickup_date
                    };

                    setRide(processedData);
                    setTitle(`${processedData.passenger.name} - ${processedData.passenger.phone}`);
                } else {
                    console.error('useRideDetail: Dados da API inválidos:', rawData);
                    setError(new Error('Dados da API inválidos ou corrida não encontrada.'));
                }
            } else {
                console.error('useRideDetail: Resposta da API sem dados válidos:', response.data);
                setError(new Error('Resposta da API sem dados válidos.'));
            }
        } catch (err) {
            console.error('useRideDetail: Erro na API:', err);
            setError(err as Error);
            HandleError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchRideDetail();

        return () => controller.abort();
    }, [rideId]);

    const acceptRide = async () => {
        try {
            setLoading(true);
            await api.put(`/rides/${rideId}/accept`, { driver_user_id: userId });
            
            await fetchRideDetail();
            
        } catch (err) {
            HandleError(err);
        } finally {
            setLoading(false);
        }
    };
    

    const cancelRide = async () => {
        try {
            await api.put(`/rides/${rideId}/cancel`, { driver_user_id: userId });
            navigation.goBack();
        } catch (err) {
            HandleError(err);
        }
    };

    const finishedRide = async () => {
        try {
            setLoading(true);
            await api.put(`/rides/${rideId}/finish`, { driver_user_id: userId });
            
            setRide(prev => prev ? {...prev, status: 'F'} : null);
            
            navigation.navigate('passagers');
        } catch (err) {
            HandleError(err);
        } finally {
            setLoading(false);
        }
    };
    

    return {
        loading,
        error,
        ride,
        title,
        fetchRideDetail,
        acceptRide,
        cancelRide,
        finishedRide
    };
};

export default useRideDetail;