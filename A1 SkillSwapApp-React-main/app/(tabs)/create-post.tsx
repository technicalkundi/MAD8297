import { AuthContext } from '@/contexts/auth-context';
import { useData } from '@/contexts/data-context';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, SegmentedButtons, Text, TextInput, Title } from 'react-native-paper';

const CATEGORIES = ['Programming', 'Music', 'Art', 'Fitness', 'Language', 'Business', 'Other'];
const DURATIONS = [30, 60, 90, 120]; // minutes

export default function CreatePost() {
  const { addOffer } = useData();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Programming');
  const [duration, setDuration] = useState(60);
  const [availableSessions, setAvailableSessions] = useState(1);
  const [loading, setLoading] = useState(false);

  const onPost = async () => {
    if (!title.trim() || !description.trim() || !category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to create an offer');
      return;
    }

    setLoading(true);
    try {
      await addOffer({
        tutorId: user.id,
        title: title.trim(),
        description: description.trim(),
        category,
        duration,
        price: 0, // Free for MVP
        availableSessions,
        rating: 0,
        totalBookings: 0,
      });
      
      Alert.alert('Success', 'Your skill offer has been created!');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to create offer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Create Skill Offer</Title>
        <Text style={styles.subtitle}>Share your expertise with the community</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Skill Title *"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              mode="outlined"
              placeholder="e.g., Python Programming Basics"
            />
            
            <TextInput
              label="Description *"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="Describe what you'll teach and what students will learn..."
            />

            <Text style={{ marginBottom: 8 }}>Category *</Text>
            <SegmentedButtons
              value={category}
              onValueChange={setCategory}
              buttons={CATEGORIES.map(c => ({ value: c, label: c }))}
            />

            <View style={styles.row}>
              <TextInput
                label="Duration (minutes)"
                value={duration.toString()}
                onChangeText={(text) => setDuration(parseInt(text) || 60)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="numeric"
              />
              <TextInput
                label="Available Sessions"
                value={availableSessions.toString()}
                onChangeText={(text) => setAvailableSessions(parseInt(text) || 1)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                keyboardType="numeric"
              />
            </View>

            <HelperText type={(!title.trim() || !description.trim()) ? 'error' : 'info'} visible={!title.trim() || !description.trim()}>
              Title and Description are required.
            </HelperText>

            <Button
              mode="contained"
              onPress={onPost}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Creating Offer...' : 'Create Offer'}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#2563eb' },
  subtitle: { fontSize: 16, marginBottom: 24, color: '#666' },
  card: { elevation: 4 },
  input: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { flex: 0.48 },
  button: { marginTop: 16 },
});
