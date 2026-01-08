import { AuthContext } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';
import React, { useContext } from 'react';

export default function Index() {
  const { user } = useContext(AuthContext);
  if (user) return <Redirect href="/(tabs)" />;
  return <Redirect href="/login" />;
}
