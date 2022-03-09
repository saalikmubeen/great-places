

const initialState = {
    places: []
}

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PLACES":
            return { places: action.payload.places };
        case "ADD_PLACE":
            const { id, image, title, location } = action.payload;
            return { ...state, places: [...state.places, { id: id, title: title, imageURI: image, lat: location.lat, lon: location.lon }] };
        default:
            return state
    }
}

export default placesReducer;