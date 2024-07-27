import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MainScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ar } = route.params;
  const [search, setSearch] = useState("");
  const [mdata, setmdata] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + ar
    );
    setmdata(res.data.meals);
  };
  const handlePress = (itid) => {
    navigation.navigate("Recipe", { id: itid });
  };
  useEffect(() => {
    fetchData();
  }, [ar]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ar}</Text>
      {mdata.length > 0 ? (
        <FlatList
          data={mdata}
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
        <Text style={styles.loadingText}>Loading...</Text>
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
