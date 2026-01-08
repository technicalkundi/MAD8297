import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function CoffeeDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [selectedSize, setSelectedSize] = useState("medium");

  const sizes = [
    { key: "small", label: "Small" },
    { key: "medium", label: "Medium" },
    { key: "large", label: "Large" },
  ];

  const getPrice = () => {
    if (item.sizes && item.sizes[selectedSize]) {
      return item.sizes[selectedSize];
    }
    return item.price;
  };

  const handleAddToCart = () => {
    if (!user) {
      Alert.alert("Login Required", "Please login to add items to cart", [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => navigation.navigate("Login") },
      ]);
      return;
    }

    const cartItem = {
      ...item,
      price: getPrice(),
      size: selectedSize,
      _id: `${item._id}_${selectedSize}`, // Unique ID for same item with different size
    };

    addToCart(cartItem);
    Alert.alert("Success", `${item.name} added to cart!`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/400",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>

        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        {/* Size Selection */}
        <View style={styles.sizeSection}>
          <Text style={styles.sizeTitle}>Size</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => {
              const price = item.sizes?.[size.key] || item.price;
              const isAvailable = item.sizes?.[size.key] !== undefined || item.price;
              
              if (!isAvailable) return null;

              return (
                <TouchableOpacity
                  key={size.key}
                  style={[
                    styles.sizeButton,
                    selectedSize === size.key && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size.key)}
                >
                  <Text
                    style={[
                      styles.sizeLabel,
                      selectedSize === size.key && styles.sizeLabelActive,
                    ]}
                  >
                    {size.label}
                  </Text>
                  <Text
                    style={[
                      styles.sizePrice,
                      selectedSize === size.key && styles.sizePriceActive,
                    ]}
                  >
                    ${price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Price Display */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>${getPrice().toFixed(2)}</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#E8DDD4",
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 25,
  },
  sizeSection: {
    marginBottom: 25,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  sizeButtonActive: {
    backgroundColor: "#6F4E37",
    borderColor: "#6F4E37",
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  sizeLabelActive: {
    color: "#FFF",
  },
  sizePrice: {
    fontSize: 14,
    color: "#6F4E37",
    fontWeight: "600",
  },
  sizePriceActive: {
    color: "#FFF",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6F4E37",
  },
  addButton: {
    backgroundColor: "#6F4E37",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
