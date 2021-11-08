import graphql = require('graphql')
import { Directors } from '../mongoose/schemas'
import db, { MovieTSType, DirectorTSType } from '../db'

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = graphql

type MovieFields = {
  [k in keyof MovieTSType]: any
}

type DirectorFields = {
  [k in keyof DirectorTSType]: any
}

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: (): MovieFields => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    genre: {
      type: GraphQLNonNull(GraphQLString),
    },
    directorId: {
      type: DirectorType,
      resolve: (parrent: MovieTSType) =>
        db.directors.find(({ id }) => parrent.directorId === id),
    },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: (): DirectorFields => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    age: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args: { id: MovieTSType['id'] }) =>
        // here should be the database request
        db.movies.find((movie) => movie.id === args.id),
    },
    movies: {
      type: GraphQLList(MovieType),
      args: { id: { type: GraphQLID } },
      resolve: () => db.movies,
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args: { id: DirectorTSType['id'] }) =>
        // here should be the database request
        db.directors.find(({ id }) => id === args.id),
    },
  }),
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  //@ts-ignore
  fields: () => ({
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        resolve: (_: any, args: DirectorTSType): DirectorTSType => {
          const director = new Directors({
            name: args.name,
            age: args.age,
          })
          return director.save()
        },
      },
    },
  }),
})

export const Schema = new GraphQLSchema({ query: Query, mutation: Mutation })
