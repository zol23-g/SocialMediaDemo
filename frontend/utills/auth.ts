import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRole = async () => {
  const role = await AsyncStorage.getItem('role');
  return role || 'USER';
};
