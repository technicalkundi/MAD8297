import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, Image, 
  SafeAreaView, ActivityIndicator, TouchableOpacity, StatusBar 
} from 'react-native';
import { COLORS } from './constants/Colors';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setLoading(false);
      })
      .catch(err => console.error("Fetch Error: ", err));
  }, []);

  const ProductCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DISCOVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Abstract Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MINIMALISTIC</Text>
        <View style={styles.line} />
        <Text style={styles.headerSub}>& ABSTRACT STORE</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={COLORS.coffee} size="large" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={ProductCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    paddingTop: 40, 
    paddingBottom: 20, 
    alignItems: 'center',
    backgroundColor: COLORS.black 
  },
  headerTitle: { 
    color: COLORS.cream, 
    fontSize: 22, 
    fontWeight: '200', 
    letterSpacing: 10 
  },
  line: { 
    width: 40, 
    height: 1, 
    backgroundColor: COLORS.coffee, 
    marginVertical: 8 
  },
  headerSub: { 
    color: COLORS.coffee, 
    fontSize: 10, 
    fontWeight: 'bold', 
    letterSpacing: 3 
  },
  listPadding: { paddingHorizontal: 10, paddingBottom: 20 },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.darkGrey,
    borderRadius: 2, // Very slight rounding for a modern feel
    overflow: 'hidden',
  },
  imageWrapper: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    height: 180, 
    justifyContent: 'center' 
  },
  image: { width: '100%', height: '100%' },
  infoContainer: { padding: 12 },
  category: { color: COLORS.coffee, fontSize: 8, fontWeight: 'bold', marginBottom: 4 },
  title: { color: COLORS.cream, fontSize: 12, fontWeight: '300', marginBottom: 8 },
  price: { color: COLORS.cream, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  button: {
    borderWidth: 1,
    borderColor: COLORS.coffee,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.coffee, fontSize: 9, fontWeight: 'bold', letterSpacing: 1 }
});