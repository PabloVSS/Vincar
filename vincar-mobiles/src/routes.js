import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Home from './screens/home/home';
import Passenger from './screens/passenger/passenger';
import Ride from './screens/ride/ride';
import RideDetail from './screens/ride-detail/ride-detail';
import Login from './screens/login/login';
import Welcome from './screens/welcome/welcome';
import Register from './screens/register/register'; // Importe o componente Register

const Stack = createNativeStackNavigator();

function Routes() {
    const isAuthenticated = !!useSelector(state => state.auth.token);
    console.log(isAuthenticated)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    // Rotas autenticadas
                    <>
                        <Stack.Screen 
                            name="home" 
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name="passenger" 
                            component={Passenger}
                            options={{
                                headerShadowVisible: false,
                                headerTitle: "",
                                headerTransparent: true
                            }} 
                        />
                        <Stack.Screen 
                            name="ride" 
                            component={Ride}
                            options={{
                                headerTitle: "Viagens Disponíveis",
                                headerTitleAlign: "center"
                            }} 
                        />
                        <Stack.Screen 
                            name="ride-detail" 
                            component={RideDetail}
                            options={{
                                headerShadowVisible: false,
                                headerTitle: "",
                                headerTransparent: true
                            }} 
                        />
                    </>
                ) : (
                    // Rotas não autenticadas
                    <>
                        <Stack.Screen 
                            name="welcome" 
                            component={Welcome}
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="login" 
                            component={Login}
                            options={{ 
                                headerShown: false,
                                animationTypeForReplace: 'pop' 
                            }} 
                        />
                        <Stack.Screen 
                            name="register" 
                            component={Register}
                            options={{ 
                                headerShown: false,
                                presentation: 'modal' 
                            }} 
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;