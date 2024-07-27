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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import areas from "../areas";

export default function MainScreen() {
  const navigation = useNavigation();
  const [byw, setbyw] = useState("c");
  const [search, setSearch] = useState("");
  const [mdata, setmdata] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    setmdata(res.data.categories);
  };

  const handleSearch = () => {
    navigation.navigate("Searchresult", { s: search });
    setSearch("");
  };

  const handleGoCategory = (c) => {
    navigation.navigate("Bycategory", {
      cat: c,
    });
  };

  const handleGoArea = (a) => {
    navigation.navigate("Byarea", {
      ar: a,
    });
  };

  const goRandomRecipe = () => {
    navigation.navigate("Randomrecipe");
  };

  const goFavScreen = () => {
    navigation.navigate("Favourites");
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Finder</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search for recipes"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setbyw("c")}>
          <Text style={styles.buttonText}>by Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.luckyButton]}
          onPress={goRandomRecipe}
        >
          <Text style={styles.buttonText}>Surprise Me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.favButton]}
          onPress={goFavScreen}
        >
          <Text style={styles.buttonText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.areaButton]}
          onPress={() => setbyw("a")}
        >
          <Text style={styles.buttonText}>by Areas</Text>
        </TouchableOpacity>
      </View>
      {byw === "c" ? (
        <View>
          {mdata.length > 0 ? (
            <FlatList
              data={mdata}
              keyExtractor={(item) => item.idCategory}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() => handleGoCategory(item.strCategory)}
                  >
                    <Image
                      source={{ uri: item.strCategoryThumb }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.infoContainer}
                    onPress={() => handleGoCategory(item.strCategory)}
                  >
                    <Text style={styles.category}>{item?.strCategory}</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={<View style={{ height: 200 }} />}
            />
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </View>
      ) : (
        <FlatList
          style={styles.flatList}
          data={areas}
          keyExtractor={(item) => item.strArea}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleGoArea(item.strArea)}
              style={styles.itemContainer}
            >
              <Image source={item.img} style={styles.areaImg} />
              <Text style={styles.areaText}>{item.strArea}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
    height: 240,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  areaImg: {
    width: "90%",
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
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
  areaText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    letterSpacing: 1,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#FF8C42",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  luckyButton: {
    backgroundColor: "#3498db",
  },
  areaButton: {
    backgroundColor: "#2ecc71",
  },
  favButton: {
    backgroundColor: "tomato",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
