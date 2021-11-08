import { gql } from '@apollo/client'

export const moviesQuery = gql`
  query moviesQuery {
    movies {
      id
      name
      genre
    }
  }
`
