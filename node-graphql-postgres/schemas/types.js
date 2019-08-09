const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const { db } = require('../pgAdaptor')

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLString },
		created: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		creator_id: { type: GraphQLString },
		creator: {
			type: UserType,
			resolve(parent, args) {
				const query = `SELECT * FROM project RIGHT JOIN users ON users.id = project.creator_id WHERE project.id = $1`
				const values = [parent.id]
				return db.one(query, values)
			}
		}
	})
})

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		joined: { type: GraphQLString },
		last_logged_in: { type: GraphQLString },
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				const query = `SELECT * FROM project LEFT JOIN users ON users.id = project.creator_id WHERE creator_id = $1`
				const values = [parent.id]
				return db.many(query, values)
			}
		}
	})
})

module.exports = {
	UserType,
	ProjectType
}
