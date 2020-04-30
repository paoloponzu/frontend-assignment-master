import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
/* import { ApolloClient, ApolloProvider } from "@apollo/client"; */
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:3001/"
});

const client = new ApolloClient({
    cache,
    link
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("app"));