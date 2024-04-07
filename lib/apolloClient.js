import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export default apolloClient;
