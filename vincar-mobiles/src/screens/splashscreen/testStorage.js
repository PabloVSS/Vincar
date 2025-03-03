import AsyncStorage from '@react-native-async-storage/async-storage';

export const testStorage = async () => {
  try {
    await AsyncStorage.setItem('testKey', 'testValue');
    const value = await AsyncStorage.getItem('testKey');
    console.log('AsyncStorage está funcionando:', value);
  } catch (error) {
    console.error('Erro ao testar AsyncStorage:', error);
  }
};


