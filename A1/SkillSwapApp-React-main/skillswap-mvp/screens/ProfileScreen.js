import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const USER = {
  name: 'Your Name',
  skills: ['React Native', 'Guitar', 'Photography'],
  bio: 'Passionate developer and musician.'
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{USER.name}</Text>
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.text}>{USER.skills.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Bio</Text>
      <Text style={styles.text}>{USER.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 12 },
  sectionTitle: { marginTop: 12, fontWeight: '600', color: '#111827' },
  text: { color: '#374151', marginTop: 4 }
});
