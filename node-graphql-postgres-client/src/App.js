import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// components
import ProjectList from './components/ProjectList'
import AddProject from './components/AddProject'
// import UpdateProject from './components/UpdateProject'

// apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
})

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>Gonners' CRUD</h1>
					<ProjectList />
					<AddProject />
				</div>
			</ApolloProvider>
		)
	}
}

export default App
