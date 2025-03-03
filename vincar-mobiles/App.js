import { Provider } from 'react-redux';
import store from './src/store/store'; // Importação sem chaves
import Routes from './src/routes';
import { Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}> 
      <Text>Oi </Text>
    </Provider>
  );
}