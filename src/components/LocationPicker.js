import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import colors from '../constants/colors';
import Map from './Map';


export default function LocationPicker(props) {
    const [isFetching, setIsFetching] = useState(false);  
    const [pickedLocation, setPickedLocation] = useState(null);


//   const verifyPermissions = async () => {
//     const result = await Permissions.askAsync(Permissions.LOCATION);
//     if (result.status !== 'granted') {
//       Alert.alert(
//         'Insufficient permissions!',
//         'You need to grant location permissions to use this app.',
//         [{ text: 'Okay' }]
//       );
//       return false;
//     }
//     return true;
//   };
    
    
    const getLocationHandler = async () => {
        try {
            setIsFetching(true);
            let location = await Location.getCurrentPositionAsync({ });
            setPickedLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            });
            props.setLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            })
            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            Alert.alert("Could not fetch location!", "Please try again later", [{ text: "Okay", }])
        }
    }


    const selectLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setPickedLocation({
            lat: latitude,
            lon: longitude
        });
        props.setLocation({
            lat: latitude,
            lon: longitude
        })
    }


      useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
          alert('Permission to access location was denied');
        return;
      }
    })();
      }, []);
    
    
    return (
        <View style={styles.locationPicker}>
        <View style={styles.mapPreview}>

        {pickedLocation ? <Map location={pickedLocation} selectLocation={selectLocation} title={props.title}/>
        : (
            <>
                {isFetching ?  (<ActivityIndicator size="large" color={colors.primary} />) : <Text>No location chosen yet!</Text>}
            </>
        )}
    
      </View>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={colors.primary}
          onPress={() => {}}
        />
      </View>
    </View>
    )
}



const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    }
});
