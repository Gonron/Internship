// const graphql = require('graphql')
const { db } = require('../pgAdaptor')
const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql')
const { ProjectType, UserType } = require('./types')
// const GraphQLSchema = graphql

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	// type: 'Query',
	fields: {
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				const query = `SELECT * FROM project WHERE id=$1`
				const values = [args.id]

				return db.one(query, values)
				// .then(res => res)
				// .catch(err => err)
			}
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				// const query = `SELECT * FROM project`
				return db.many('SELECT * FROM project')
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				const query = `SELECT * FROM users WHERE id=$1`
				const values = [args.id]

				return db.one(query, values)
				// .then(res => res)
				// .catch(err => err)
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return db.many('SELECT * FROM users')
			}
		}
	}
})

module.exports = {
	query: RootQuery
}
