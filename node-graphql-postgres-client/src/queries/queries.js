import { gql } from 'apollo-boost'

const getProjectsQuery = gql`
	{
		projects {
			title
			description
			id
		}
	}
`
const getProjectQuery = gql`
	query($id: ID) {
		project(id: $id) {
			title
			description
			creator_id
			created
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

export { getProjectsQuery, getProjectQuery, addProjectMutation }
