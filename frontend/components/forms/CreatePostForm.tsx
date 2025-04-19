// components/forms/CreatePostForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';

import { CREATE_POST } from '../../graphql/mutations/createPost';
import { useImagePicker } from '../../hooks/useImagePicker';
import { PostSchema } from '../../validation/authValidation';

export default function CreatePostForm() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { pickImageBase64 } = useImagePicker();
  const [createPost, { loading }] = useMutation(CREATE_POST);

  const handlePick = async (setFieldValue: (field: string, value: any) => void) => {
    const base64 = await pickImageBase64();
    if (base64) {
      setImageBase64(base64);
      setFieldValue('media', `data:image/jpeg;base64,${base64}`);
    }
  };

  const handleSubmit = async (values: { caption: string; media: string }) => {
    try {
      await createPost({ variables: values });
      Alert.alert('Success', 'Post created');
      setImageBase64(null);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ caption: '', media: '' }}
        validationSchema={PostSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor="#aaa"
              style={styles.input}
              value={values.caption}
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
            />
            {touched.caption && errors.caption && <Text style={styles.error}>{errors.caption}</Text>}

            {imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                style={styles.preview}
              />
            )}
            {touched.media && errors.media && <Text style={styles.error}>{errors.media}</Text>}

            <Button title="Pick Image" onPress={() => handlePick(setFieldValue)} />
            <View style={{ height: 10 }} />
            <Button title={loading ? 'Posting...' : 'Submit Post'} onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  input: {
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
  },
  preview: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'left',
  },
});
