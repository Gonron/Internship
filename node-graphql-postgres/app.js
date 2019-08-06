const graphql = require('graphql')
const express = require('express')
const expressGraphQl = require('express-graphql')
const { GraphQLSchema } = graphql
const { query } = require('./schemas/queries')
const { mutation } = require('./schemas/mutations')

const cors = require('cors')
const PORT = 4000

const app = express()
app.use(cors())

const schema = new GraphQLSchema({
	query,
	mutation
})

app.use(
	'/graphql',
	expressGraphQl({
		schema: schema,
		graphiql: true
	})
)

app.listen(PORT, () => {
	console.log(`Now listening for requests on port ${PORT}.`)
})
