// app/comments/[id].tsx
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GET_COMMENTS } from '../../graphql/queries/getComments';
import { ADD_COMMENT } from '../../graphql/mutations/addComments';

export default function CommentsScreen() {
  const { id: postId } = useLocalSearchParams();
  const [text, setText] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { postId },
  });
  const [addComment] = useMutation(ADD_COMMENT);

  const submitComment = async () => {
    if (!text) return;
    await addComment({ variables: { postId, content: text, parentId } });
    setText('');
    setParentId(null);
    refetch();
  };

  const renderReplies = (replies: any[]) =>
    replies.map((reply) => (
      <View key={reply.id} style={styles.reply}>
        <Text style={styles.user}>{reply.user.username}:</Text>
        <Text style={styles.content}>{reply.content}</Text>
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error loading comments</Text>
      ) : (
        <FlatList
          data={data.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentBlock}>
              <Text style={styles.user}>{item.user.username}:</Text>
              <Text style={styles.content}>{item.content}</Text>
              {renderReplies(item.replies)}
              <Button
                title="Reply"
                onPress={() => setParentId(item.id)}
                color="#FFD700"
              />
            </View>
          )}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder={parentId ? 'Reply...' : 'Add a comment...'}
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" onPress={submitComment} color="#FFD700" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  header: { fontSize: 22, color: '#FFD700', marginBottom: 10, textAlign: 'center' },
  commentBlock: { marginBottom: 15 },
  user: { color: '#FFD700', fontWeight: 'bold' },
  content: { color: '#ccc', marginBottom: 4 },
  reply: { paddingLeft: 20, borderLeftWidth: 1, borderLeftColor: '#444', marginTop: 5 },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    borderColor: '#333',
    borderWidth: 1,
    marginVertical: 10,
  },
});
