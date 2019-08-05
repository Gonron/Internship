// const graphql = require('graphql')
const { db } = require('../pgAdaptor')
const { GraphQLObjectType, GraphQLID } = require('graphql')
const { UserType, ProjectType } = require('./types')
// const GraphQLSchema = graphql

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	// type: 'Query',
	fields: {
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				const query = `SELECT * FROM project WHERE id=$1`
				const values = [args.id]

				return db
					.one(query, values)
					.then(res => res)
					.catch(err => err)
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				const query = `SELECT * FROM users WHERE id=$1`
				const values = [args.id]

				return db
					.one(query, values)
					.then(res => res)
					.catch(err => err)
			}
		}
	}
})

module.exports = {
	query: RootQuery
}
