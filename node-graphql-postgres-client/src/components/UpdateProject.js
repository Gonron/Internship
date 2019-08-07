import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { updateProjectMutation, getProjectQuery, getProjectsQuery } from '../queries/queries'

class UpdateProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creator_id: '',
			title: '',
			description: ''
		}
	}
	submitForm(e) {
		e.preventDefault()
		console.log('Before:', this.state)
		this.props.updateProjectMutation({
			variables: {
				id: this.props.projectId,
				creator_id: this.state.creator_id,
				title: this.state.title,
				description: this.state.description
			},
			// refetchQueries: [{ query: getProjectsQuery }]
			refetchQueries: () => [
				{ query: getProjectsQuery },
				{ query: getProjectQuery, variables: { id: this.props.projectId } }
			]
		})
		this.setState({
			creator_id: '',
			title: '',
			description: ''
			// },
			// () => {
			// 	console.log('After:', this.state)
		})
	}
	render() {
		// console.log('projectID:', this.props.projectId)
		return (
			<form id="update-project" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Project Creator's ID:</label>
					<input
						type="text"
						onChange={e => this.setState({ creator_id: e.target.value })}
						value={this.state.creator_id}
					/>
				</div>
				<div className="field">
					<label>Title:</label>
					<input
						type="text"
						onChange={e => this.setState({ title: e.target.value })}
						value={this.state.title}
					/>
				</div>
				<div className="field">
					<label>Description:</label>
					<input
						type="text"
						onChange={e => this.setState({ description: e.target.value })}
						value={this.state.description}
					/>
				</div>
				<button>+</button>
			</form>
		)
	}
}

// binds the query to the component
export default compose(graphql(updateProjectMutation, { name: 'updateProjectMutation' }))(UpdateProject)
