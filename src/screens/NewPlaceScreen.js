import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button , Platform, Image} from 'react-native'
import { useDispatch } from 'react-redux';
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';
import colors from '../constants/colors';
import { addPlace } from '../store/actions';

export default function NewPlaceScreen(props) {
    const dispatch = useDispatch()
    const [place, setPlace] = useState("");
    const [img, setImg] = useState(null);
  const [location, setLocation] = useState(null);

    const addPlaceHandler = () => {
        dispatch(addPlace(place, img, location));
        props.navigation.goBack();
    }


    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Place Name</Text>
                <TextInput style={styles.textInput} value={place} onChangeText={setPlace} />

                <ImgPicker setImg={setImg} />
                <LocationPicker setLocation={setLocation} title={place}/>

                <Button title="Add Place" onPress={addPlaceHandler} color={colors.primary} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})
