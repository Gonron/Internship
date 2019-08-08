import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { addProjectMutation, getProjectsQuery, getUsersQuery } from '../queries/queries'

class AddProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creator_id: '',
			title: '',
			description: ''
		}
	}
	displayCreator() {
		const data = this.props.getUsersQuery
		if (data.loading) {
			return <option disabled>Loading Creators...</option>
		} else {
			// console.log(data)
			return data.users.map((creator, indx) => {
				return (
					<option key={indx} value={creator.id}>
						{creator.username}
					</option>
				)
			})
		}
	}

	submitForm(e) {
		e.preventDefault()
		this.props.addProjectMutation({
			variables: {
				creator_id: this.state.creator_id,
				title: this.state.title,
				description: this.state.description
			},
			refetchQueries: [{ query: getProjectsQuery }]
		})
		this.setState({
			creator_id: '',
			title: '',
			description: ''
		})
	}
	render() {
		return (
			<form className="add-project" onSubmit={this.submitForm.bind(this)}>
				<h3>Add Project</h3>
				<div className="field">
					<label>Project Creator:</label>
					<select
						onChange={e => this.setState({ creator_id: e.target.value })}
						value={this.state.creator_id}
					>
						<option>Select Creator</option>
						{this.displayCreator()}
					</select>
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
export default compose(
	graphql(getUsersQuery, { name: 'getUsersQuery' }),
	graphql(addProjectMutation, { name: 'addProjectMutation' })
)(AddProject)
