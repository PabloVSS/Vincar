import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api, HandledError } from "../constants/api"; // Certifique-se de que api está configurada corretamente

export const useRidesAvailable = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { user } = useSelector(state => state.auth);
    const userId = user?.id; 


    const [rides, setRides] = useState([]);
    const [ride, setRide] = useState({});
    const [title, setTitle] = useState("");

    const rideId = route.params?.rideId; // Obtém rideId dos parâmetros

    function ClickRide(id) {
        if (!userId) {
            Alert.alert("Erro", "Faça login para continuar");
            navigation.navigate("Login");
            return;
        }
        navigation.navigate("ride-detail", {
            rideId: id,
            userId: userId,
        });
    }

    async function RequestRides() {

        if (!userId) return;

        try {
            const response = await api.get("/rides");
            setRides(response.data || []);
        } catch (error) {
            HandledError(error);
        }
    }

    async function RequestRideDetail() {
        if (!rideId) return; // Se rideId não estiver definido, não faz nada

        try {
            const response = await api.get(`/rides/${rideId}`);
            if (response.data) {
                setTitle(response.data.passenger_name + " - " + response.data.passenger_phone);
                setRide(response.data);
            }
        } catch (error) {
            HandledError(error);
        }
    }

    async function AcceptRide() {
        if (!userId) {
            Alert.alert("Erro", "Faça login para aceitar corridas");
            navigation.navigate("Login");
            return;
        }
        try {
            await api.put(`/rides/${rideId}/accept`, { driver_user_id: userId });
            navigation.goBack();
        } catch (error) {
            HandledError(error);
        }
    }

    async function CancelRide() {
        if (!userId) {
            Alert.alert("Erro", "Faça login para cancelar corridas");
            navigation.navigate("Login");
            return;
        }
        try {
            await api.put(`/rides/${rideId}/cancel`, { driver_user_id: userId });
            navigation.goBack();
        } catch (error) {
            HandledError(error);
        }
    }


    return {
        rides,
        ride,
        title,
        userId,
        rideId,
        ClickRide,
        RequestRides,
        RequestRideDetail,
        AcceptRide,
        CancelRide,
    };
};