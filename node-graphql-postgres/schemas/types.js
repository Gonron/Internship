const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const { db } = require('../pgAdaptor')

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	// type: 'Query',
	fields: {
		id: { type: GraphQLString },
		created: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		creator_id: { type: GraphQLString }
		// creator: {
		// 	type: UserType,
		// 	resolve(parent, args) {
		// 		const query = `SELECT * FROM project INNER JOIN users ON users.id = project.creator_id WHERE project.id = $1`
		// 		console.log('parent:', parent)
		// 		const values = [parent.id]
		// 		return db.many(query, values)
		// 	}
		// }
	}
})

const UserType = new GraphQLObjectType({
	name: 'User',
	// type: 'Query',
	fields: {
		id: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		joined: { type: GraphQLString },
		last_logged_in: { type: GraphQLString },
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				const query = `SELECT * FROM project LEFT JOIN users ON users.id = project.creator_id WHERE creator_id = $1`
				// console.log(parent)
				const values = [parent.id]
				return db.many(query, values)
			}
		}
	}
})

module.exports = {
	UserType,
	ProjectType
}
