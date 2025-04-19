// components/screens/auth/Signup.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { router } from 'expo-router';
import { Formik } from 'formik';

import { SignupSchema } from '../../../validation/authValidation';
import { SIGNUP } from '../../../graphql/mutations/signup';

export default function Signup() {
  const [signup, { loading }] = useMutation(SIGNUP);

  const handleSignup = async (values: { username: string; email: string; password: string }) => {
    try {
      const { data } = await signup({ variables: values });
      await AsyncStorage.setItem('token', data.signup.token);
      await AsyncStorage.setItem('role', data.signup.user.role);
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik initialValues={{ username: '', email: '', password: '' }} validationSchema={SignupSchema} onSubmit={handleSignup}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#aaa"
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

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

            <Button title={loading ? 'Signing up...' : 'Sign Up'} onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.link}>Already have an account? Login here</Text>
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
