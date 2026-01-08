import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  bio: string;
  profilePicture?: string;
  skills: string[];
  rating: number;
  totalSessions: number;
  role: 'student' | 'admin';
};

export type AuthUser = User | null;

export type AuthContextType = {
  user: AuthUser;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => Promise.resolve({ ok: false }),
  signUp: () => Promise.resolve({ ok: false }),
  signOut: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      // For MVP, use dummy credentials
      if (email === 'test@student.com' && password === '12345') {
        const userData: User = {
          id: 'u1',
          email,
          name: 'Your Name',
          bio: 'Passionate developer and musician.',
          skills: ['React Native', 'Guitar', 'Photography'],
          rating: 4.8,
          totalSessions: 12,
          role: 'student'
        };
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return { ok: true };
      }
      return { ok: false, message: 'Invalid credentials' };
    } catch (error) {
      return { ok: false, message: 'Login failed' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    try {
      // For MVP, create a new user
      const userData: User = {
        id: `u${Date.now()}`,
        email,
        name,
        bio: '',
        skills: [],
        rating: 0,
        totalSessions: 0,
        role: 'student'
      };
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return { ok: true };
    } catch (error) {
      return { ok: false, message: 'Registration failed' };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [user]);

  const value = useMemo(() => ({ user, signIn, signUp, signOut, updateProfile }), [user, signIn, signUp, signOut, updateProfile]);

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
