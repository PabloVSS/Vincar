import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MyButton from "../../components/mybutton/mybutton";
import ScreenSearch from "../../components/screenSearch/screenSearch";
import { styles } from "./ride-detail.styles";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import icons from "../../constants/icons";
import { useRidesAvailable } from "../../services/ridesAvailable";

function RideDetail(props){

    const { ride, RequestRideDetail, AcceptRide, CancelRide} = useRidesAvailable();

    useEffect(() => {
        RequestRideDetail();
    }, []);



    return (
        
        <View style={styles.container}>
        <View style={styles.container}>

            <MapView style={styles.map} 
                     provider={PROVIDER_DEFAULT} 
                     initialRegion={{
                        latitude: Number(ride.pickup_latitude),
                        longitude: Number(ride.pickup_longitude),
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                     }}>

            <Marker coordinate={{ 
                latitude: Number(ride.pickup_latitude),
                longitude: Number(ride.pickup_longitude),
            }}
                    title=""
                    description=""
                    style={styles.marker}
            >
                 <Image 
                        source={icons.car} 
                        style={{ width: 30, height: 30 }} 
                        resizeMode="contain" 
                    />
               
                </Marker>
          
          </MapView>
          <View style={styles.footer}>
          <View style={styles.footerText}>
                <Text> Encontre sua carona</Text>
            </View>

            <View style={styles.footerFields}>
                <Text> Origem</Text>
                <TextInput style={styles.input} value={ride.pickup_address}
                editable={false}
                />
            </View>
        
        <View style={styles.footerFields}>
            <Text> Destino</Text>
            <TextInput style={styles.input}
            value={ride.dropoff_address}
            editable={false}
            />
        </View>
        </View>
        </View>
       
        {
            ride.status == "P" && <MyButton
            text="ACEITAR"
            theme="default" 
            onClick={AcceptRide}
           /> }

            {
            ride.status == "A" && <MyButton
                text="CANCELAR"
                theme="red" 
                onClick={CancelRide}
            />}


        </View>
           
    )
}

export default RideDetail;