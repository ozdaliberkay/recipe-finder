import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import ByCategory from "../screens/ByCategory";
import ByArea from "../screens/ByArea";
import RecipeDetail from "../screens/RecipeDetail";
import SearchResult from "../screens/SearchResult";
import RandomRecipe from "../screens/RandomRecipe";
import FavouritesScreen from "../screens/FavouritesScreen";
import { Provider, useDispatch } from "react-redux";
import store from "../store.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFavourites } from "../slices/FavouritesSlice.js";

const Stack = createNativeStackNavigator();

const LoadFavourites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAsync = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("favourites");
        if (jsonValue != null) {
          const favourites = JSON.parse(jsonValue);
          dispatch(setFavourites(favourites));
        }
      } catch (error) {
        console.error("Failed to load favourites:", error);
      }
    };
    getAsync();
  }, [dispatch]);

  return null;
};

export default function Index() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <LoadFavourites />
        <Stack.Navigator screenOptions={{ headerTitle: "Recipes" }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Bycategory" component={ByCategory} />
          <Stack.Screen name="Byarea" component={ByArea} />
          <Stack.Screen name="Recipe" component={RecipeDetail} />
          <Stack.Screen name="Searchresult" component={SearchResult} />
          <Stack.Screen name="Randomrecipe" component={RandomRecipe} />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
