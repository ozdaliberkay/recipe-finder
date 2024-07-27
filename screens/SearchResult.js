import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RecipeDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { s } = route.params;
  const [mdata, setmdata] = useState([]);
  const [searchx, setsearchx] = useState("");

  const fetchData = async (x) => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + x
    );
    setmdata(res.data.meals);
  };

  const handlePress = (itid) => {
    navigation.navigate("Recipe", { id: itid });
  };

  const handleSearch = () => {
    fetchData(searchx);
    setsearchx("");
  };
  useEffect(() => {
    fetchData(s);
  }, [s]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setsearchx}
        value={searchx}
        placeholder="Search for recipes"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <FlatList
        data={mdata}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => handlePress(item.idMeal)}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => handlePress(item.idMeal)}
            >
              <Text style={styles.mealName}>{item?.strMeal}</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF4F2",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8, // iOS gölge
  },
  image: {
    width: "100%",
    height: 200,
    borderBottomWidth: 3,
    borderBottomColor: "#FF6F61",
  },
  infoContainer: {
    padding: 15,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
  },
});
