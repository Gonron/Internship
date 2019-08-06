import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getProjectQuery } from '../queries/queries'

class ProjectDetails extends Component {
	displayProjectDetials() {
		const { project } = this.props.data
		if (project) {
			return (
				<div>
					<h2>{project.title}</h2>
					<p>{project.description}</p>
					{/* <p>{project.created}</p> */}
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
