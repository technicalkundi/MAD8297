// app/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BASE_URL } from "../../config/api";

export default function HomeScreen({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories] = useState(["All", "Hot Coffee", "Cold Coffee"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getMenu = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/coffee`);
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.log("getMenu error:", err);
      alert("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const getRandom = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/coffee/random`);
      const data = await res.json();
      setRandomItem(data);
      navigation.navigate("CoffeeDetail", { item: data });
    } catch (err) {
      console.log("getRandom error:", err);
      alert("Failed to get surprise item");
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const featuredItems = menu.filter((item) => item.featured).slice(0, 3);
  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6F4E37" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>☕ Coffee Shop</Text>
        <Text style={styles.headerSubtitle}>Your perfect cup awaits</Text>
      </View>

      {/* Surprise Me Button */}
      <TouchableOpacity style={styles.surpriseButton} onPress={getRandom}>
        <Text style={styles.surpriseButtonText}>🎲 Surprise Me</Text>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Section */}
      {featuredItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Featured</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredItems.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.featuredCard}
                onPress={() => navigation.navigate("CoffeeDetail", { item })}
              >
                <Image
                  source={{ uri: item.image || "https://via.placeholder.com/200" }}
                  style={styles.featuredImage}
                />
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.featuredPrice}>${item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {filteredMenu.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.menuCard}
            onPress={() => navigation.navigate("CoffeeDetail", { item })}
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/100" }}
              style={styles.menuImage}
            />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuCategory}>{item.category}</Text>
              <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#6F4E37",
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E8DDD4",
  },
  surpriseButton: {
    backgroundColor: "#D4A574",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  surpriseButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    marginLeft: 15,
  },
  categoryChipActive: {
    backgroundColor: "#6F4E37",
  },
  categoryText: {
    color: "#6F4E37",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#FFF",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
    marginBottom: 15,
  },
  featuredCard: {
    width: 200,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F4E37",
  },
  menuCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  menuInfo: {
    flex: 1,
    justifyContent: "center",
  },
  menuName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  menuCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  menuPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F4E37",
  },
});
