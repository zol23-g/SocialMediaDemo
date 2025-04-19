import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [role, setRole] = useState('LOADING');

  useEffect(() => {
    const load = async () => {
      const token = await AsyncStorage.getItem('token');
      const userRole = await AsyncStorage.getItem('role');
      if (!token) return router.replace('/(auth)/login');
      setRole(userRole || 'USER');
    };
    load();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'role']);
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile</Text>
      <Text style={styles.info}>Role: {role}</Text>
      <Button title="Logout" color="#FFD700" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: '#FFD700', fontSize: 24, marginBottom: 10 },
  info: { color: '#ccc', fontSize: 16, marginBottom: 30 },
});
