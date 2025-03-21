import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { api } from '@/constants/api';

interface UseRidesProps {
    statusFilter?: 'P' | 'A' | 'F' | 'C';
    refreshInterval?: number;
}

interface Ride {
    id: string;
    status: 'P' | 'A' | 'F' | 'C';
    pickup_address: string;
    dropoff_address: string;
    passenger?: { name: string; phone: string };
}

const useRides = ({ statusFilter, refreshInterval = 5000 }: UseRidesProps) => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRides = async () => {
        try {
            setLoading(true);
            setError(null);
    
            const response = await api.get('/rides', {
                params: { status: statusFilter }
            });
    
  
    
            if (!response.data) {
                console.error("response.data é undefined ou null");
                throw new Error('Resposta da API sem dados.');
            }
    
            if (!response.data.data) {
                console.error("response.data.data é undefined ou null");
                throw new Error('Resposta da API sem dados válidos.');
            }
    
            if (!Array.isArray(response.data.data)) {
                console.error("response.data.data não é um array:", response.data.data);
                throw new Error('Resposta da API com formato inválido.');
            }
    
            setRides(response.data.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;
                setError(axiosError.response?.data?.message || 'Erro desconhecido na API');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro inesperado');
            }
            setRides([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRides();
        const intervalId = setInterval(fetchRides, refreshInterval);
        return () => clearInterval(intervalId);
    }, [statusFilter, refreshInterval]);

    return {
        rides,
        loading,
        error,
        refetch: fetchRides,
    };
};

export default useRides;