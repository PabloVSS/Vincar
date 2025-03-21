import { api } from '@/constants/api';
import { useState, useEffect } from 'react';

interface Ride {
  id: number;
  pickup_address: string;
  dropoff_address: string;
  pickup_date: string;
  status: 'P' | 'A' | 'F' | 'C'; 
  passenger?: { name: string; phone: string };
  driver?: { name: string; phone: string };
}

const useHistory = (token: string | null, isDriver: boolean) => {
  const [history, setHistory] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (!token) {
          throw new Error('Autenticação necessária');
        }

        const endpoint = isDriver 
          ? '/rides/driver/history' 
          : '/rides/passenger/history';

        const response = await api(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: abortController.signal
        });

        if (response.status < 200 || response.status >= 300) {
          const errorData = response.data;
          throw new Error(errorData.message || 'Erro ao carregar histórico');
        }

        const data: Ride[] = response.data;
        setHistory(data);
        
      } catch (err: any) {
        if (!abortController.signal.aborted) {
          setError(err.message || 'Erro desconhecido');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (token) {
      fetchHistory();
    }

    return () => abortController.abort();
  }, [token, isDriver]);

  return { history, loading, error };
};

export default useHistory;