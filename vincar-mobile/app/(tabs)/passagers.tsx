import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { usePassengerRide } from '../../hooks/usePassengerRide';
import { styles } from '../../styles/passagers.styles';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RideCard from '@/components/RideCard/rideCard';

const Passagers = () => {
    const {
        pickupAddress,
        setPickupAddress,
        dropoffAddress,
        setDropoffAddress,
        rideStatus,
        rideId,
        createRide,
        cancelRide,
        finishedRide,
        loading,
        location: userLocation,
        driverName,
    } = usePassengerRide();

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (!loading && isInitialLoad) {
            setIsInitialLoad(false);
        }
    }, [loading]);

    if (isInitialLoad) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={styles.container}>
                    {userLocation && (
                        <MapView
                            style={styles.map}
                            initialRegion={userLocation}
                            region={userLocation}
                            showsUserLocation={true}
                            followsUserLocation={true}
                        >
                            <Marker coordinate={userLocation}>
                                <View style={styles.locationIcon}>
                                    <View style={styles.locationDot} />
                                </View>
                            </Marker>
                        </MapView>
                    )}

                    <RideCard
                        pickupAddress={pickupAddress}
                        setPickupAddress={setPickupAddress}
                        dropoffAddress={dropoffAddress}
                        setDropoffAddress={setDropoffAddress}
                        rideStatus={rideStatus}
                        driverName={driverName}
                        createRide={createRide}
                        cancelRide={cancelRide}
                        finishedRide={finishedRide}
                        isRideActive={!!rideId}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Passagers;