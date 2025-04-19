// components/screens/Feed.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { TOGGLE_LIKE } from '../../graphql/mutations/toggleLike';
import { RATE_POST } from '../../graphql/mutations/ratePost';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMediaUrl } from '../../utills/media';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Feed() {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);
  const [toggleLike] = useMutation(TOGGLE_LIKE);
  const [ratePost] = useMutation(RATE_POST);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(setUserId);
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await toggleLike({ variables: { postId } });
      refetch();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleComment = (postId: string) => {
    router.push(`/comments/${postId}`);
  };

  const handleRate = async (postId: string, value: number) => {
    try {
      await ratePost({ variables: { postId, value } });
      refetch();
    } catch (err) {
      console.error('Error rating post:', err);
    }
  };

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) {
    console.log('GraphQL Error:', error.message);
    return <Text style={styles.text}>Error fetching feed.</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {!data?.posts?.length ? (
        <Text style={styles.text}>No posts found.</Text>
      ) : (
        <FlatList
          data={data.posts}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const liked = item.likes?.some((like: any) => like.user.id === userId);
            const avgRating = item.ratings?.length
              ? item.ratings.reduce((acc: number, r: any) => acc + r.value, 0) / item.ratings.length
              : 0;

            return (
              <View style={styles.post}>
                {item.media ? (
                  <Image source={{ uri: getMediaUrl(item.media) }} style={styles.media} />
                ) : (
                  <Text style={{ color: 'red' }}>No media</Text>
                )}
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.meta}>By: {item.user.username}</Text>
                <Text style={styles.meta}>
                  Posted at: {new Date(Number(item.timestamp)).toLocaleString()}
                </Text>

                <View style={styles.actionsRow}>
                  <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.iconRow}>
                    <Ionicons
                      name={liked ? 'heart' : 'heart-outline'}
                      size={28}
                      color="red"
                    />
                    <Text style={{ color: '#fff', marginLeft: 8 }}>{item.likes?.length} Likes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleComment(item.id)} style={styles.iconRow}>
                    <FontAwesome name="commenting-o" size={24} color="#FFD700" />
                    <Text style={{ color: '#fff', marginLeft: 8 }}>Comments</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRate(item.id, star)}>
                      <Ionicons
                        name="star"
                        size={24}
                        color={star <= Math.round(avgRating) ? '#FFD700' : '#555'}
                      />
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.ratingText}>
                    {item.ratings?.length ? ` (${avgRating.toFixed(1)})` : ''}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  post: {
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  media: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  caption: {
    color: '#FFD700',
    fontSize: 18,
    marginBottom: 6,
    textAlign: 'center',
  },
  meta: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ratingText: {
    color: '#FFD700',
    marginLeft: 8,
    fontSize: 14,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
