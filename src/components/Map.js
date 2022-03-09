import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Map(props) {
    const { location, selectLocation, title, readOnly } = props;

    return (
        <MapView style={styles.map} initialRegion={{latitude: location.lat, longitude: location.lon, latitudeDelta: 0.0922, longitudeDelta:  0.0421}}
            onPress={!readOnly ? selectLocation : () => { }}>
            <Marker
            key={1}
            coordinate={{latitude: location.lat, longitude: location.lon}}
            title={title}
            // description={null}
    />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    }
})
