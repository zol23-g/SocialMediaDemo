// components/common/PostRating.tsx
import React, { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { useMutation, useQuery } from '@apollo/client';
import { Text } from 'react-native';
import { GET_RATINGS } from '../../graphql/queries/getRatings';
import { RATE_POST } from '../../graphql/mutations/ratePost';

export default function PostRating({ postId }: { postId: string }) {
  const [rating, setRating] = useState(0);

  const { data, refetch } = useQuery(GET_RATINGS, {
    variables: { postId },
  });

  const [ratePost] = useMutation(RATE_POST);

  useEffect(() => {
    if (data?.myRating) {
      setRating(data.myRating);
    }
  }, [data]);

  const handleRate = async (value: number) => {
    setRating(value);
    await ratePost({ variables: { postId, value } });
    refetch();
  };

  return (
    <>
      <StarRating
        rating={rating}
        onChange={handleRate}
        starSize={24}
        starStyle={{ marginHorizontal: 2 }}
        color="#FFD700"
      />
      <Text style={{ color: '#fff', fontSize: 14, marginTop: 4 }}>
        Avg: {data?.averageRating?.toFixed(1) || 'N/A'}
      </Text>
    </>
  );
}
