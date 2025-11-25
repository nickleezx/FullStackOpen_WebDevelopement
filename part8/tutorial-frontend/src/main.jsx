import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client/react'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
    // uri: 'http://localhost:4000',
    link: httpLink,
    cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </StrictMode>,
)
