import { AuthContext } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';

export default function Signup() {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    const res = await signUp(email.trim(), password, name.trim());
    setLoading(false);
    
    if (res.ok) {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/');
    } else {
      Alert.alert('Signup Failed', res.message || 'Registration failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Create Account</Title>
        <Text style={styles.subtitle}>Join the SkillSwap community</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
            <Button
              mode="contained"
              onPress={onSignup}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Creating Account…' : 'Signup'}
            </Button>
            <Button
              mode="text"
              onPress={() => router.back()}
              style={styles.linkButton}
            >
              Already have an account? Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#2563eb' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 32, color: '#666' },
  card: { elevation: 4 },
  input: { marginBottom: 16 },
  button: { marginTop: 8, marginBottom: 16 },
  linkButton: { marginTop: 8 },
});
