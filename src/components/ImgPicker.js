import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../constants/colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

//   const verifyPermissions = async () => {
//     const result = await Permissions.askAsync(
//       Permissions.CAMERA_ROLL,
//       Permissions.CAMERA
//     );
//     if (result.status !== 'granted') {
//       Alert.alert(
//         'Insufficient permissions!',
//         'You need to grant camera permissions to use this app.',
//         [{ text: 'Okay' }]
//       );
//       return false;
//     }
//     return true;
//   };

    const takeImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });


    if (!result.cancelled) {
        setPickedImage(result.uri);
        props.setImg(result.uri);
    }
    };
    

    useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    }, []);

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
