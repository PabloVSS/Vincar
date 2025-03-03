import { Alert, Image, ImageBackground, Text, TouchableOpacity } from "react-native"
import {styles } from "./home.styles";
import icons from "../../constants/icons";
import { useNavigation } from "@react-navigation/native";


function Home(props){

    const navigation = useNavigation();



    return (
       
                <ImageBackground source={icons.bg} resizeMode="cover" 
                style={styles.bg}>
                    <Image source={icons.logo} style={styles.logo}/>
                
                   <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('passenger')}> 
                        <Image source={icons.passenger} style={styles.img} />
                        <Text style={styles.title}>Passageiro</Text>
                        <Text style={styles.text}>Encontre uma carona</Text>
                    </TouchableOpacity>

                       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ride')} > 
                            <Image source={icons.driver} style={styles.img} />
                            <Text style={styles.title}>Motorista</Text>
                            <Text style={styles.text}>Ofereça uma carona</Text>
                        </TouchableOpacity>  

                </ImageBackground>
    )
}

export default Home;