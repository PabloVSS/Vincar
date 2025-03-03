import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MyButton from "../../components/mybutton/mybutton";
import { styles } from "./passenger.styles";
import { useEffect } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, View } from "react-native";
import icons from "../../constants/icons";
import { useLocationService } from "../../services/locationServices";

function Passenger(){

    const {
        CancelRide,
        FinishRide,
        status,
        AskForRide,
        mylocation,
        title,
        pickupAddress,
        setPickupAddress,
        dropoffAddress,
        setDropoffAddress,
        LoadScreen,
        driverName, 
    } = useLocationService();



    
        useEffect(() => {
        LoadScreen();
    }
    , []);

    return (
        
        <View style={styles.container}>

        {
        mylocation.latitude ? <> 

        <View style={styles.container}>
            <MapView style={styles.map} 
                     provider={PROVIDER_DEFAULT} 
                     initialRegion={{
                        latitude: mylocation.latitude,
                        longitude: mylocation.longitude,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                     }}>
            <Marker coordinate={
                {
                    latitude: mylocation.latitude,
                    longitude: mylocation.longitude,
                    
                 }
            }
                    title=""
                    description=""
                    style={styles.marker}
            >
                 <Image 
                        source={icons.people} 
                        style={{ width: 30, height: 30 }} 
                        resizeMode="contain" 
                    />
               
                </Marker>
          
          </MapView>
          <View style={styles.footer}>
          <View style={styles.footerText}>
                <Text> {title}</Text>
            </View>

            <View style={styles.footerFields}>
                <Text> Origem</Text>
                <TextInput style={styles.input} value={pickupAddress}
                onChangeText={(text) => setPickupAddress(text)}
                editable={status == "" ? true : false}/>
            </View>
            
        
        <View style={styles.footerFields}>
            <Text> Destino</Text>
            <TextInput style={styles.input} value={dropoffAddress}
                onChangeText={(text) => setDropoffAddress(text)} 
                editable={status == "" ? true : false}/>
        </View>

        { status == "A" &&
        <View style={styles.footerFields}>
            <Text> Motorista</Text>
            <TextInput style={styles.input} value={driverName} 
                editable={false}/>
        </View>
    }


        </View>
        </View>
    
            {
            status == "" &&  <MyButton
            text="CONFIRMAR"
            theme="default" 
            onClick={AskForRide}
            />}
            {
            status == "P" && <MyButton
            text="CANCELAR"
            theme="red" 
            onClick={CancelRide}
           /> }

            {
                status == "A" && <MyButton
                text="FINALIZAR CARONA"
                theme="red" 
                onClick={FinishRide}
            />}
            
</> : 

<View style={styles.loading}>
    <ActivityIndicator size="large" color="#0000ff"/>
    </View>


        }


        </View>
    )

}

export default Passenger;