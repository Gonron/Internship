import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getProjectQuery } from '../queries/queries'
import moment from 'moment'

import UpdateProject from './UpdateProject'
import DeleteProject from './DeleteProject'

class ProjectDetails extends Component {
	displayProjectDetials() {
		const { project } = this.props.data
		if (project) {
			const createdDate = moment(Date(project.created)).format('MMMM Do YYYY')
			return (
				<div>
					<h2>{project.title}</h2>
					<p id="username_p">
						{project.creator.username} - {createdDate}
					</p>
					<p>{project.description}</p>

					<h3>Other projects by {project.creator.username}</h3>
					{project.creator.projects.map((item, indx) => {
						return <li key={indx}>{item.title}</li>
					})}
					<br />
					<UpdateProject projectId={this.props.projectId} creatorId={this.props.creatorId} />
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
