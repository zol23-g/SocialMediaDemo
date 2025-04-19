// components/screens/auth/Login.tsx
import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import { Formik } from 'formik';

import { LOGIN } from '../../../graphql/mutations/login';
import { LoginSchema } from '../../../validation/authValidation';

export default function Login() {
  const [login, { loading }] = useMutation(LOGIN);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const { data } = await login({ variables: values });
      await AsyncStorage.setItem('token', data.login.token);
      await AsyncStorage.setItem('role', data.login.user.role);
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title={loading ? 'Logging in...' : 'Login'} onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
        <Text style={styles.link}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000' },
  input: { borderColor: '#333', borderWidth: 1, marginBottom: 10, padding: 10, color: '#fff' },
  title: { textAlign: 'center', color: '#FFD700', fontSize: 20, marginBottom: 20 },
  link: { color: '#FFD700', marginTop: 20, textAlign: 'center', fontSize: 14 },
  error: { color: 'red', fontSize: 12, marginBottom: 5, textAlign: 'left' },
});
