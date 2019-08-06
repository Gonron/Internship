const graphql = require('graphql')
const db = require('../pgAdaptor').db
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql
const { ProjectType, UserType } = require('./types')
// const GraphQLSchema = graphql

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	// type: 'Mutation',
	fields: {
		addProject: {
			type: ProjectType,
			args: {
				creatorId: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING *`
				const values = [args.creatorId, new Date(), args.title, args.description]

				return db.one(query, values)
				// .then(res => res)
				// .catch(err => err)
			}
		}
	}
	/* For some reason this wont show up in Graphiql */
	// addUser: {
	// 	type: UserType,
	// 	args: {
	// 		username: { type: GraphQLString },
	// 		email: { type: GraphQLString }
	// 	},
	// 	resolve(parentValue, args) {
	// 		const query = `INSERT INTO users(username, email, joined, last_logged_in) VALUES ($1, $2, $3, $4) RETURNING username, email`
	// 		const values = [args.username, args.email, new Date(), new Date()]

	// 		return db.one(query, values)
	// 	}
	// }
})

module.exports = {
	mutation: RootMutation
}
