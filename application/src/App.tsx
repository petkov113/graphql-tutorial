import { ApolloProvider } from 'react-apollo'
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client'
import { moviesQuery } from './queries/queries'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3005/graphql/src',
})

type Movie = {
  id: string
  title: string
  genre: string
}

function App() {
  const { loading, error, data } = useQuery<Movie[]>(moviesQuery)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {data?.map((movie) => (
          <div>
            <span>{movie.title}</span>
            <span>{movie.genre}</span>
          </div>
        ))}
      </div>
    </ApolloProvider>
  )
}

export default App
