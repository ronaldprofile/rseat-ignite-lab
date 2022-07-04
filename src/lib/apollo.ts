import { ApolloClient, InMemoryCache } from "@apollo/client";

export const clientApollo = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache()
});
