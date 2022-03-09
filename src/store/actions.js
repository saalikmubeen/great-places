import * as FileSystem from 'expo-file-system';
import { insertPlace, getPlaces } from "../storage/db";

// const MAP_BOX_API_KEY = "pk.eyJ1Ijoic2FhbGlrbXViZWVuIiwiYSI6ImNrY2E3YXg5cjA2ZWgycHVucHprOHY2aGwifQ.oFfB7dqiKVB9qvKF3-31rQ"
// const MAP_BOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lon},${location.lat}.json?types=poi&access_token=${MAP_BOX_API_KEY}`;


export const addPlace = (title, img, location) => {
    return async function (dispatch) {
        const imgPath = img;
        const imgName = img.split("/").pop();
        const newPath = FileSystem.documentDirectory + imgName; // creating newPath where image will be stored

        try {
            // actually moving/storing the image in the newPath;
            await FileSystem.moveAsync({
            from: imgPath,
            to: newPath
            });

            const result = await insertPlace(title, newPath, location.lat, location.lon);

            dispatch({ type: "ADD_PLACE", payload: { id: result.insertId, title: title, image: newPath, location: location } });

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

    }
}


export const fetchPlaces = () => {
    return async function (dispatch) {
        try {
            const result = await getPlaces();
            const places = result.rows._array;

            dispatch({ type: "FETCH_PLACES", payload: { places: places } });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

    }
}

