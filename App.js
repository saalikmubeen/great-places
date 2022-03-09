
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import NewPlaceScreen from './src/screens/NewPlaceScreen';
import PlaceDetailScreen from './src/screens/PlaceDetailScreen';
import PlacesListScreen from './src/screens/PlacesListScreen';
import colors from './src/constants/colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderBtn from './src/components/CustomHeaderButton';
import store from './src/store/configureStore';
import { initializeDB } from "./src/storage/db";


initializeDB().then(() => {
  console.log("Database initialized successfully!")
}).catch((err) => {
  console.log("Error while initializing the database...")
  console.log(err);
})


const Stack = createStackNavigator();

const defaultNavigationOptions = {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          
          <Stack.Navigator screenOptions={defaultNavigationOptions}>

              <Stack.Screen name="Places List" component={PlacesListScreen} options={(props) => {
                  return {
                      headerTitle: "All Places",
                      headerRight: () => {
                          return <HeaderButtons HeaderButtonComponent={CustomHeaderBtn}>
                              <Item title="Add Place" iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                              onPress={() => props.navigation.navigate("New Place")}/>
                          </HeaderButtons>
                      }
                  }
              }}/>

              <Stack.Screen name="New Place" component={NewPlaceScreen} options={{headerTitle: "Add Place"}}/>

              <Stack.Screen name="Place Details" component={PlaceDetailScreen} options={(props) => {
                  const placeTitle = props.route.params.placeTitle
                  return {
                      headerTitle: placeTitle
                  }
              }}/>
              
          </Stack.Navigator>
      
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
