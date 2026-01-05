import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";

export default function CoffeeCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginVertical: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 120, borderRadius: 10 }}
        />
        <Text style={{ fontSize: 18, marginTop: 8 }}>{item.name}</Text>
        <Text style={{ color: "gray" }}>{item.category}</Text>
        <Text style={{ fontWeight: "bold" }}>Rs. {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
