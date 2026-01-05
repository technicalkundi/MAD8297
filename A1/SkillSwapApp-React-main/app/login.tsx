import { AuthContext } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const res = await signIn(email.trim(), password);
    setLoading(false);
    if (res.ok) {
      router.replace('/');
    } else {
      Alert.alert('Login Failed', res.message || 'Invalid credentials');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>SkillSwap</Title>
        <Text style={styles.subtitle}>Connect, Learn, Grow</Text>
        
        <Card style={styles.card}>
          <Card.Content>
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
              onPress={onLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Signing in…' : 'Login'}
            </Button>
            <Button
              mode="text"
              onPress={() => router.push('/signup')}
              style={styles.linkButton}
            >
              No account? Signup
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.credentialsCard}>
          <Card.Content>
            <Text style={styles.credentialsTitle}>Demo Credentials</Text>
            <Text style={styles.credentialsText}>Email: test@student.com</Text>
            <Text style={styles.credentialsText}>Password: 12345</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#2563eb' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 32, color: '#666' },
  card: { marginBottom: 16, elevation: 4 },
  credentialsCard: { backgroundColor: '#e3f2fd', elevation: 2 },
  input: { marginBottom: 16 },
  button: { marginTop: 8, marginBottom: 16 },
  linkButton: { marginTop: 8 },
  credentialsTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#1976d2' },
  credentialsText: { fontSize: 12, color: '#666', marginBottom: 4 },
});
