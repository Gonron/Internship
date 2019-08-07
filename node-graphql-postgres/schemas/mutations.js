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
				creator_id: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString }
			},
			resolve(parent, args) {
				const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING *`
				const values = [args.creator_id, new Date(), args.title, args.description]

				return db.one(query, values)
				// .then(res => res)
				// .catch(err => err)
			}
		},
		addUser: {
			type: UserType,
			args: {
				username: { type: GraphQLString },
				email: { type: GraphQLString }
			},
			resolve(parent, args) {
				const query = `INSERT INTO users(username, email, joined, last_logged_in) VALUES ($1, $2, $3, $4) RETURNING *`
				const values = [args.username, args.email, new Date(), new Date()]

				return db.one(query, values)
			}
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLID },
				creator_id: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString }
			},
			resolve(parent, args) {
				const query = `UPDATE project SET creator_id = $1, created = $2, title = $3, description = $4 WHERE id = $5 RETURNING *`
				const values = [args.creator_id, new Date(), args.title, args.description, args.id]

				return db.one(query, values)
			}
		},
		deleteProject: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				const query = `DELETE FROM project WHERE id = $1 RETURNING *`
				const values = [args.id]

				return db.one(query, values)
			}
		}
	}
})

module.exports = {
	mutation: RootMutation
}

// UPDATE table_name
// SET column1 = value1, column2 = value2...., columnN = valueN
// WHERE [condition];
