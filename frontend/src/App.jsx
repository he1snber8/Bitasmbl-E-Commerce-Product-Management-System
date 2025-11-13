// Apollo Client setup
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Dashboard from './components/Dashboard';
const client = new ApolloClient({ uri: process.env.REACT_APP_GRAPHQL_URL || '/graphql', cache: new InMemoryCache() });
export default function App(){ return (<ApolloProvider client={client}><Dashboard/></ApolloProvider>); }