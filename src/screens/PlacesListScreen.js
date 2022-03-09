import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PlaceItem from '../components/PlaceItem';
import { fetchPlaces } from "../store/actions";

export default function PlacesListScreen(props) {
    const dispatch = useDispatch();
    const places = useSelector((state) => state.places.places);

    useEffect(() => {
        dispatch(fetchPlaces())
    }, [dispatch]);


    return (
        <FlatList data={places} keyExtractor={(item) => item.id.toString()} renderItem={(element) => {
            return <PlaceItem image={element.item.imageURI} title={element.item.title}
                onSelect={() => { props.navigation.navigate("Place Details", { placeId: element.item.id, placeTitle: element.item.title }) }} />
        } }/>
    )
}

const styles = StyleSheet.create({})
