import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app.js'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker.js';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import 'antd/dist/antd.css';

// 3
const client = new ApolloClient({
  link: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

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
