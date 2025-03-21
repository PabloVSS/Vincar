// constants/HandleError.js
import { Alert } from 'react-native';

interface ErrorResponse {
  data: any;
  status: number;
  headers: any;
}

interface Error {
  response?: ErrorResponse;
  request?: any;
  message?: string;
}

const HandleError = (error: Error): void => {
  console.error('Erro na API:', error);

  if (error.response) {
    console.error('Dados do erro:', error.response.data);
    console.error('Status code:', error.response.status);
    console.error('Headers:', error.response.headers);

    if (error.response.status === 401) {
      Alert.alert('Erro de Autenticação', 'Sua sessão expirou. Por favor, faça login novamente.');
    } else if (error.response.status === 404) {
      Alert.alert('Erro', 'Recurso não encontrado.');
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao processar a solicitação.');
    }
  } else if (error.request) {
    console.error('Erro na solicitação:', error.request);
    Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
  } else {
    console.error('Erro de configuração:', error.message);
    Alert.alert('Erro', 'Ocorreu um erro inesperado.');
  }
};

export default HandleError;