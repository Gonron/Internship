import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getProjectsQuery } from '../queries/queries'

// components
import ProjectDetails from './ProjectDetails'

class ProjectList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: null,
			selected_creator: null
		}
	}
	displayProjects() {
		let data = this.props.data
		if (data.projects) {
			if (data.loading) {
				return <div>Loading Projects...</div>
			} else {
				return data.projects.map((project, indx) => {
					// console.log('project', project)
					return (
						<li
							key={indx}
							onClick={e => {
								this.setState({
									selected: project.id,
									selected_creator: project.creator_id
								})
							}}
						>
							{project.title}
						</li>
					)
				})
			}
		} else {
			return <div>No Assigned Projects</div>
		}
	}
	render() {
		return (
			<div>
				<ul id="project-list">{this.displayProjects()}</ul>
				<ProjectDetails projectId={this.state.selected} creatorId={this.state.selected_creator} />
			</div>
		)
	}
}

// binds the query to the component
export default graphql(getProjectsQuery)(ProjectList)
