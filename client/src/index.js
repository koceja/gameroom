import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app.js'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker.js';

// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import 'antd/dist/antd.css';

// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'

//import { ApolloProvider } from '@apollo/react-hooks'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';


const client = new ApolloClient({
  uri: createHttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache()
});

// const link = new HttpLink({ uri: 'https://localhost:4000/graphql' })
// const cache = new InMemoryCache()
// const client = new ApolloClient({
//   link,
//   cache
// })



// // 3
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphiql',
//   cache: new InMemoryCache()
// })



// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
)
serviceWorker.unregister();
