import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
    baseURL: "http://192.168.3.37:3001",
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

function HandledError(error) {
    if (error.response?.data.error) {
        Alert.alert(error.response.data.error);
    } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
    }
}

export { api, HandledError };
