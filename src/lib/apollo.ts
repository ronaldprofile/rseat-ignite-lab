import { ApolloClient, InMemoryCache } from "@apollo/client";

export const clientApollo = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4o6k7vp0vgr01xme96r5ncl/master",
  cache: new InMemoryCache()
});
