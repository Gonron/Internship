import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getProjectQuery } from '../queries/queries'

import UpdateProject from './UpdateProject'
import DeleteProject from './DeleteProject'

class ProjectDetails extends Component {
	displayProjectDetials() {
		const { project } = this.props.data
		if (project) {
			return (
				<div>
					<h2>{project.title}</h2>
					<p>{project.description}</p>
					<UpdateProject projectId={this.props.projectId} />
					<DeleteProject projectId={this.props.projectId} />
				</div>
			)
		} else {
			return <div>No Project Selected...</div>
		}
	}
	render() {
		return <div id="project-details">{this.displayProjectDetials()}</div>
	}
}

export default graphql(getProjectQuery, {
	options: props => {
		return {
			variables: {
				id: props.projectId
			}
		}
	}
})(ProjectDetails)
