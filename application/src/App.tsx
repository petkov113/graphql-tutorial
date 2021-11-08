import { ApolloProvider } from 'react-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3005/graphql/src',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App"></div>
    </ApolloProvider>
  )
}

export default App
