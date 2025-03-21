import { useState, useEffect } from "react";
import axios from "axios";

interface Ride {
  id: string;
  pickup_address: string;
  dropoff_address: string;
  pickup_date: string;
  driver?: { name: string; phone: string };
  passenger?: { name: string; phone: string };
}

export const useRides = (userRole: "passenger" | "driver") => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint =
          userRole === "passenger"
            ? "/api/rides/passenger/history"
            : "/api/rides/driver/history";

        const token = localStorage.getItem("token");
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRides(response.data.data);
      } catch (err) {
        setError("Erro ao carregar o histórico de corridas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [userRole]);

  return { rides, loading, error };
};

