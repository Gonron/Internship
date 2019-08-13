import React, { Component } from 'react'
import db from '../db'

class CompanyDetails extends Component {
	displayCompanyDetails() {
		if (this.props.company_id) {
			let selected = this.props.company_id - 1
			return (
				<div>
					<p>{db[selected].name}</p>
					<p>{db[selected].cvr}</p>
				</div>
			)
		} else {
			return <div>No Company Selected...</div>
		}
	}
	render() {
		return <div>{this.displayCompanyDetails()}</div>
	}
}

export default CompanyDetails
