import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MainScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cat } = route.params;
  const [mdata, setmdata] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat
    );
    setmdata(res.data.meals);
  };

  const handlePress = (itid) => {
    navigation.navigate("Recipe", { id: itid });
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cat}</Text>

      {mdata.length > 0 ? (
        <FlatList
          data={mdata}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handlePress(item.idMeal)}>
                <Image
                  source={{ uri: item.strMealThumb }}
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
    backgroundColor: "#FDF4F2",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6F61",
    textAlign: "center",
    marginVertical: 20,
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
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    height: 280,
    borderBottomWidth: 2,
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
  loadingText: {
    fontSize: 18,
    color: "#FF6F61",
    textAlign: "center",
    marginTop: 20,
  },
});
