import { Image, Text, TextInput, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useState } from "react";
import icons from "../../constants/icons";
import { styles } from "./screenSearch.styles";

function ScreenSearch(coordinates, title, icon){

  

    const [mylocation, setMyLocation] = useState(null);


    return (
        <View style={styles.container}>
            <MapView style={styles.map} 
                     provider={PROVIDER_DEFAULT} 
                     initialRegion={coordinates}>
            <Marker coordinate={coordinates}
                    title=""
                    description=""
                    style={styles.marker}
            >
                 <Image 
                        source={icon == "passenger" ? icons.people : icons.car} 
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
                <TextInput style={styles.input}/>
            </View>
        
        <View style={styles.footerFields}>
            <Text> Destino</Text>
            <TextInput style={styles.input}/>
        </View>
        </View>
        </View>
           
    )
}

export default ScreenSearch;