import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000', // Your GraphQL endpoint
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export default apolloClient;
