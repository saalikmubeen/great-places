import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import placesReducer from "./reducer";

const rootReducer = combineReducers({
    places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;