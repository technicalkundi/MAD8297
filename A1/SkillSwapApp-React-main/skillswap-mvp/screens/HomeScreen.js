import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OFFERS = [
  { id: 'o1', title: 'Python Tutoring', tutor: 'Ali', description: 'Beginner to intermediate Python.' },
  { id: 'o2', title: 'Guitar Lessons', tutor: 'Fatima', description: 'Acoustic & basic music theory.' },
  { id: 'o3', title: 'Drawing Basics', tutor: 'Ahmed', description: 'Pencil, shading, perspective.' },
  { id: 'o4', title: 'Yoga & Meditation', tutor: 'Sara', description: 'Relaxation and mindfulness.' },
];

export default function HomeScreen() {
  const data = useMemo(() => OFFERS, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>By {item.tutor}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, backgroundColor: '#fff' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  cardSubtitle: { marginTop: 4, color: '#6b7280' },
  cardDesc: { marginTop: 8, color: '#374151' }
});
