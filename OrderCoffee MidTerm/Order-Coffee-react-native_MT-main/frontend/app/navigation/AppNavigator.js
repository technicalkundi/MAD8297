import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CoffeeDetailScreen from "../screens/CoffeeDetailScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6F4E37",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate("Cart")}
              >
                <Text style={styles.headerButtonText}>
                  🛒 {cart.length > 0 && `(${cart.length})`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate(user ? "Profile" : "Login")}
              >
                <Text style={styles.headerButtonText}>
                  {user ? "👤" : "🔐"}
                </Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    marginRight: 10,
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
  headerButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
