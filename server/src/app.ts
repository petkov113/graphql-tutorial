import express = require('express')
import graphQL = require('express-graphql')
import schema = require('../schema/schema')
import cors = require('cors')

const { graphqlHTTP } = graphQL
const { Schema } = schema

const app = express()
const PORT = 3005

app.use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true }))

app.use(cors())

app.listen(PORT, () => {
  console.log('Server started!')
})
