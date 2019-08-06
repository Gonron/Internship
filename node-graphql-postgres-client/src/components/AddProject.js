import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { addProjectMutation, getProjectsQuery } from '../queries/queries'

class AddProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creator_id: '',
			title: '',
			description: ''
		}
		// this.subitForm = this.subitForm.bind(this)
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
	}
	render() {
		return (
			<form id="add-project" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Project Creator's ID:</label>
					<input
						type="text"
						onChange={e => this.setState({ creator_id: e.target.value })}
					/>
				</div>
				<div className="field">
					<label>Title:</label>
					<input type="text" onChange={e => this.setState({ title: e.target.value })} />
				</div>
				<div className="field">
					<label>Description:</label>
					<input
						type="text"
						onChange={e => this.setState({ description: e.target.value })}
					/>
				</div>
				<button>+</button>
			</form>
		)
	}
}

// binds the query to the component
export default compose(graphql(addProjectMutation, { name: 'addProjectMutation' }))(AddProject)
