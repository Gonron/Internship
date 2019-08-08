import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { deleteProjectMutation, getProjectsQuery, getProjectQuery } from '../queries/queries'

class DeleteProject extends Component {
	clickForm(e) {
		e.preventDefault()
		this.props.deleteProjectMutation({
			variables: {
				id: this.props.projectId
			},
			refetchQueries: () => [
				{ query: getProjectsQuery },
				{ query: getProjectQuery, variables: { id: this.props.projectId } }
			]
		})
	}
	render() {
		// console.log('props-dp', this.props)
		return (
			<button className="test" id="delete-project" onClick={this.clickForm.bind(this)}>
				-
			</button>
		)
	}
}

export default compose(graphql(deleteProjectMutation, { name: 'deleteProjectMutation' }))(DeleteProject)
