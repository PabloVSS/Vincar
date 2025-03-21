import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { api, HandledError } from '@/constants/api'; 

const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post('/user', {
        name,
        email,
        phone,
        password,
      });
      navigation.navigate('login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      HandledError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    senhaVisivel,
    setSenhaVisivel,
    handleRegister,
    loading,
  };
};

export default useRegister;