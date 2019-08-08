import { gql } from 'apollo-boost'

const getProjectsQuery = gql`
	{
		projects {
			title
			description
			id
			creator_id
		}
	}
`
const getProjectQuery = gql`
	query($id: ID) {
		project(id: $id) {
			title
			description
			created
			creator {
				username
				projects {
					title
					description
				}
			}
		}
	}
`

const addProjectMutation = gql`
	mutation($creator_id: ID!, $title: String!, $description: String!) {
		addProject(creator_id: $creator_id, title: $title, description: $description) {
			title
			description
		}
	}
`

const updateProjectMutation = gql`
	mutation($id: ID!, $creator_id: ID!, $title: String!, $description: String!) {
		updateProject(id: $id, creator_id: $creator_id, title: $title, description: $description) {
			creator_id
			title
			description
		}
	}
`

const deleteProjectMutation = gql`
	mutation($id: ID!) {
		deleteProject(id: $id) {
			id
		}
	}
`

const getUsersQuery = gql`
	{
		users {
			id
			username
			email
		}
	}
`

export {
	getProjectsQuery,
	getProjectQuery,
	addProjectMutation,
	updateProjectMutation,
	deleteProjectMutation,
	getUsersQuery
}
