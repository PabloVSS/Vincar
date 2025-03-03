// locationService.js (ou rideService.js)
import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from 'expo-location';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api, HandledError } from '../constants/api';

export const useLocationService = (props) => {

    const navigation = useNavigation(); 
    
    const { user } = useSelector(state => state.auth);
    const userId = user?.id;  //id do usuario logado no app(vem do login)
    const [mylocation, setMyLocation] = useState({});
    const [title, setTitle] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [dropoffAddress, setDropoffAddress] = useState("");
    const [status, setStatus] = useState("");
    const [rideId, setRideId] = useState(0);
    const [driverName, setDriverName] = useState("");

    async function RequestPermissionsAndGetLocation() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();

            if (currentPosition.coords.latitude) {
                return currentPosition.coords;
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    async function requestRiderFromUser() {
        if (!userId) { // Verifica se o usuário está autenticado
            Alert.alert("Erro", "Usuário não autenticado");
            navigation.navigate('Login');
            return {};
        }
    
        // Acessa API
        
        try {
            const response = await api.get("/rides", {
              params: {
                passenger_user_id: userId,
              }
            });
          
            if (response.data[0]) {
              return response.data[0];
            } else {
              return {};
            }
          } catch (error) {
            HandledError(error);
            return {}; // Retorna um objeto vazio caso ocorra um erro
          }

        return response;
    }

    async function RequestAddressName(latitude, longitude) {
        const response = await reverseGeocodeAsync({ latitude, longitude });

        if (response[0].street && response[0].streetNumber && response[0].district) {
            setPickupAddress(response[0].street + ", " +
                response[0].streetNumber + " - " +
                response[0].district);
        }
    }

    async function LoadScreen() {
        const response = await requestRiderFromUser();

        if (!response.ride_id) {
            const location = await RequestPermissionsAndGetLocation();

            if (location.latitude) {
                setTitle("Encontre sua carona agora!");
                setMyLocation(location);
                RequestAddressName(location.latitude, location.longitude);
            } else {
                Alert.alert("Não foi possível obter sua localização");
            }
        } else {
            setTitle(response.status == "P" ? "Aguardando uma corona" : "Corona confirmada");
            setMyLocation({
                latitude: Number(response.pickup_latitude),
                longitude: Number(response.pickup_longitude),
            });
            setPickupAddress(response.pickup_address);
            setDropoffAddress(response.dropoff_address);
            setStatus(response.status);
            setRideId(response.ride_id);
            setDriverName(response.driver_name + " - " + response.driver_phone);

        }
    }

    async function AskForRide(){

        if (!userId) {
            Alert.alert("Erro", "Usuário não autenticado");
            navigation.navigate('Login');
            return;
        }

        if (!mylocation.latitude || !mylocation.longitude) {
            Alert.alert("Erro", "Localização inválida. Tente novamente.");
            return;
        }
    
        const json = {
            passenger_id: userId,
            pickup_address: pickupAddress,
            dropoff_address: dropoffAddress,
            pickup_latitude: mylocation.latitude,
            pickup_longitude: mylocation.longitude
        };
    
        try {
            const response = await api.post("/rides", json);
            if (response.data) {
                return response.data;
            } else {
                return {};
            }
        } catch (error) {
            HandledError(error);
        }
        navigation.goBack();

    }

    async function CancelRide() {
        if (!userId) {
            Alert.alert("Erro", "Usuário não autenticado");
            navigation.navigate('Login');
            return;
        }

        try {

            await api.put(`/rides/${rideId}/cancel`, { 
                passenger_user_id: userId // Usa o ID dinâmico
            });

            await api.put(`/rides/${rideId}/cancel`, { passenger_user_id: userId });
            console.log("Corrida cancelada:", { passenger_user_id: userId, ride_id: rideId });
            navigation.goBack();
        } catch (error) {
            HandledError(error);
        }
    }
    
    async function FinishRide() {
        try {
            await api.put(`/rides/${rideId}/finish`, { passenger_user_id: userId });
            console.log("Corrida finalizada:", { passenger_user_id: userId, ride_id: rideId });
            navigation.goBack();
        } catch (error) {
            HandledError(error);
        }
    }





    return {
        status,
        setStatus,
        mylocation,
        title,
        pickupAddress,
        setPickupAddress,
        dropoffAddress,
        setDropoffAddress,
        RequestPermissionsAndGetLocation,
        requestRiderFromUser,
        RequestAddressName,
        LoadScreen,
        AskForRide,
        CancelRide,
        FinishRide,
        driverName, 
        setDriverName
    };
};