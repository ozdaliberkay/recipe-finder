import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import areas from "../areas";
import { useDispatch, useSelector } from "react-redux";
import { getFavData, removeFav } from "../slices/FavouritesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [mdata, setmdata] = useState(null);
  const [isFav, setisFav] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setmdata(res.data.meals[0]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  let myImg = areas.find((a) => a.strArea === mdata?.strArea);

  const { favourites } = useSelector((state) => state.favorites);

  const ingredientsAndMeasures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mdata?.[`strIngredient${i}`];
    const measure = mdata?.[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsAndMeasures.push({ ing: ingredient, ms: measure });
    }
  }

  const updateAsyncStorage = async (updatedFavourites) => {
    try {
      await AsyncStorage.setItem(
        "favourites",
        JSON.stringify(updatedFavourites)
      );
    } catch (error) {
      console.error("Failed to save favourites to storage:", error);
    }
  };

  const handleFav = () => {
    if (mdata) {
      let updatedFavourites;
      if (favourites.some((f) => f.idMeal === mdata.idMeal)) {
        dispatch(removeFav(mdata));
        setisFav(false);
        updatedFavourites = favourites.filter((f) => f.idMeal !== mdata.idMeal);
      } else {
        dispatch(getFavData(mdata));
        setisFav(true);
        updatedFavourites = [...favourites, mdata];
      }
      updateAsyncStorage(updatedFavourites);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          {mdata && (
            <TouchableOpacity onPress={handleFav}>
              <Text
                style={{
                  fontSize: 30,
                  marginRight: 10,
                  color: isFav ? "orange" : "black",
                }}
              >
                {isFav ? "★" : "☆"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [navigation, isFav, mdata]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (mdata) {
      setisFav(favourites.some((f) => f.idMeal === mdata.idMeal));
    }
  }, [favourites, mdata]);

  if (!mdata) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={myImg?.img} style={styles.areaImage} />
        <Text style={styles.categoryText}>{mdata.strCategory}</Text>
      </View>
      <Text style={styles.title}>{mdata.strMeal}</Text>
      <Image
        source={{ uri: mdata.strMealThumb }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.ingTexth}>Ingredients And Measures</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={ingredientsAndMeasures}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{
                  uri: `https://www.themealdb.com/images/ingredients/${item.ing}-Small.png`,
                }}
                style={styles.ingImage}
              />
              <Text style={styles.ingredientText}>{item.ing}</Text>
              <Text>{item.ms}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <Text style={styles.ingTexth}>Instructions</Text>
      <Text style={styles.insText}>{mdata.strInstructions}</Text>
      <Text style={styles.footerText}>Enjoy your meal!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  areaImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF8C42",
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  insText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
  },
  ingTexth: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF8C42",
    marginBottom: 10,
    textAlign: "center",
  },
  flatListContainer: {
    height: 120,
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  ingImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  ingredientText: {
    fontSize: 14,
    marginTop: 5,
    color: "#333",
  },
  listContainer: {
    paddingVertical: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C42",
    marginTop: 20,
  },
});
