import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function FavouritesScreen() {
  const { favourites } = useSelector((f) => f.favorites);
  const navigation = useNavigation();
  console.group(favourites);
  const handlePress = (itid) => {
    navigation.navigate("Recipe", { id: itid });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handlePress(item.idMeal)}>
                <Image
                  source={{ uri: item?.strMealThumb }}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infoContainer}
                onPress={() => handlePress(item.idMeal)}
              >
                <Text style={styles.mealName}>{item?.strMeal}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.loadingText}>...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8C42",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#FF8C42",
    marginVertical: 5,
  },
  area: {
    fontSize: 14,
    color: "#777",
  },
  loadingText: {
    fontSize: 18,
    color: "#FF8C42",
    textAlign: "center",
    marginTop: 20,
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
