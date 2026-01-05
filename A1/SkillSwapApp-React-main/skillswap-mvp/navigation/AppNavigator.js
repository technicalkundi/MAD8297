import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { Text } from 'react-native';
import CreatePostScreen from '../screens/CreatePostScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarLabel = ({ label, focused }) => (
  <Text style={{ color: focused ? '#2563eb' : '#6b7280', fontSize: 12 }}>{label}</Text>
);

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: ({ focused }) => <TabBarLabel label="Home" focused={focused} /> }} />
      <Tab.Screen name="Create Post" component={CreatePostScreen} options={{ tabBarLabel: ({ focused }) => <TabBarLabel label="Create" focused={focused} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: ({ focused }) => <TabBarLabel label="Profile" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  const signIn = useCallback((email, password) => {
    if (email === 'test@student.com' && password === '12345') {
      setUser({ id: 'u1', email });
      return { ok: true };
    }
    return { ok: false, message: 'Invalid credentials' };
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const authContext = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={Tabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

const AuthContext = React.createContext({ user: null, signIn: () => {}, signOut: () => {} });

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Login' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: 'Signup' }} />
    </Stack.Navigator>
  );
}

export { AuthContext };
