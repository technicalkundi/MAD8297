import { useData } from '@/contexts/data-context';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, FAB, IconButton, Searchbar, Text, Title } from 'react-native-paper';

const CATEGORIES = ['All', 'Programming', 'Music', 'Art', 'Fitness', 'Language', 'Business'];

export default function HomeScreen() {
  const { offers, searchOffers } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const filteredOffers = useMemo(() => {
    let filtered = offers;
    
    if (searchQuery.trim()) {
      filtered = searchOffers(searchQuery, selectedCategory === 'All' ? undefined : selectedCategory);
    } else if (selectedCategory !== 'All') {
      filtered = offers.filter(offer => offer.category === selectedCategory);
    }
    
    return filtered;
  }, [offers, searchQuery, selectedCategory, searchOffers]);

  const renderOffer = ({ item }: { item: any }) => (
    <Card style={styles.offerCard} mode="elevated">
      <Card.Content>
        <Title style={styles.offerTitle}>{item.title}</Title>
        <Text style={styles.tutorName}>By {item.tutorId}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.offerFooter}>
          <Chip mode="outlined" style={styles.categoryChip}>
            {item.category}
          </Chip>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
            <Text style={styles.sessions}>{item.availableSessions} sessions left</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" compact onPress={() => router.push({ pathname: '/offer-details', params: { offerId: item.id } })}>
          View Details
        </Button>
        <Button mode="contained" compact onPress={() => router.push({ pathname: '/book-session', params: { offerId: item.id } })}>
          Book Session
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Title style={styles.headerTitle}>Discover Skills</Title>
          <IconButton icon="bell-outline" onPress={() => {}} accessibilityLabel="Notifications" />
        </View>
        <Searchbar
          placeholder="Search skills..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Chip
              mode={selectedCategory === item ? 'flat' : 'outlined'}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
              style={styles.categoryChip}
            >
              {item}
            </Chip>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      <FlatList
        data={filteredOffers}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/create-post')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', padding: 16, elevation: 2 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#2563eb' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  searchbar: { marginBottom: 16 },
  categoriesContainer: { paddingVertical: 8 },
  categoryChip: { marginRight: 8 },
  listContainer: { padding: 16 },
  offerCard: { marginBottom: 16, elevation: 2 },
  offerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  tutorName: { fontSize: 14, color: '#666', marginBottom: 8 },
  description: { fontSize: 14, color: '#333', marginBottom: 12 },
  offerFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingContainer: { alignItems: 'flex-end' },
  rating: { fontSize: 14, fontWeight: 'bold', color: '#ff9800' },
  sessions: { fontSize: 12, color: '#666' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});
