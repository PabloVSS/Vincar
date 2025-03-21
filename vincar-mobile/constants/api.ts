import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ErrorResponse {
  response?: {
    data: {
      error: string;
    };
  };
}
const api = axios.create({
    baseURL: "http://192.168.3.8:3000",
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token armazenado:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });



function HandledError(error: ErrorResponse): void {
  if (error.response?.data.error) {
    Alert.alert(error.response.data.error);
  } else {
    Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
  }
}

export { api, HandledError };
