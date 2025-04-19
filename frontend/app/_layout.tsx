import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  );
}
