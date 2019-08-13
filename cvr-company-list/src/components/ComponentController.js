import React, { Component } from 'react'
import CompanyDetails from './CompanyDetails'
import CompanyList from './CompanyList'

class ComponentController extends Component {
	displayComponent() {
		console.log('test')
		if (this.props.company_id) {
			return <CompanyDetails company_id={this.props.company_id} />
		} else {
			return <CompanyList />
		}
	}
	render() {
		return <div>{this.displayComponent()}</div>
	}
}

export default ComponentController
