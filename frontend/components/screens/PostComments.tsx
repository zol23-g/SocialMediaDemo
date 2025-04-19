import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS } from '../../graphql/queries/getComments';
import { ADD_COMMENT } from '../../graphql/mutations/addComments';

export default function PostComments({ postId }: { postId: string }) {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: { postId }
  });

  const [content, setContent] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);

  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async () => {
    if (!content.trim()) return;

    await addComment({ variables: { postId, content, parentId } });
    setContent('');
    setParentId(null);
    refetch();
  };

  const renderReplies = (replies: any[]) =>
    replies.map((reply) => (
      <View key={reply.id} style={styles.reply}>
        <Text style={styles.replyText}>{reply.user.username}: {reply.content}</Text>
      </View>
    ));

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentText}>{item.user.username}: {item.content}</Text>
            {renderReplies(item.replies || [])}
            <Button title="Reply" onPress={() => setParentId(item.id)} />
          </View>
        )}
      />

      <TextInput
        placeholder="Write a comment..."
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Post Comment" onPress={handleAddComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#000' },
  comment: { marginBottom: 15 },
  commentText: { color: '#fff' },
  reply: { marginLeft: 20, marginTop: 5 },
  replyText: { color: '#aaa' },
  input: {
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    marginTop: 10
  },
});
