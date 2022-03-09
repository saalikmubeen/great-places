import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Map from '../components/Map';

export default function PlaceDetailScreen({ route }) {
    const id = route.params.placeId;
    const selectedPlace = useSelector((state) => state.places.places).find((place) => place.id === id);

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Image source={{ uri: selectedPlace.imageURI }}  style={styles.image}/>
        <View style={styles.locationContainer}>
        <Map location={{lat: selectedPlace.lat, lon: selectedPlace.lon}} title={selectedPlace.title} readOnly/>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '90%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
