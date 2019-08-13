import React, { Component } from 'react'
import db from '../db'
import CompanyDetails from './CompanyDetails'

class CompanyList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: null
		}
	}
	displayCompanies() {
		if (db) {
			return db.map((company, indx) => {
				return (
					<li
						key={indx}
						onClick={e => {
							this.setState({
								selected: company.id
							})
						}}
					>
						{company.name}
					</li>
				)
			})
		} else {
			return <div>No Companies Found</div>
		}
	}
	render() {
		return (
			<div className="company-list">
				<ul>{this.displayCompanies()}</ul>
				<h3>Company Info</h3>
				<CompanyDetails company_id={this.state.selected} />
				{/* <ComponentController company_id={this.state.selected} /> */}
			</div>
		)
	}
}

export default CompanyList
