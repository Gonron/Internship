import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends Component {
	state = {
		posts: []
	}
	componentDidMount() {
		axios
			.get('http://localhost:4000')
			.then(res => {
				this.setState({
					posts: res.data
				})
			})
			.catch(err => console.log('Error:', err))
	}
	render() {
		const posts = this.state.posts
		const postList = posts.data ? (
			posts.data.map(post => {
				return (
					<div className="post card" key={post.cvr}>
						<div className="card-content">
							<Link to={'/' + post.cvr}>
								<span className="card-title red-text">{post.company_name}</span>
							</Link>
							<p>{post.cvr}</p>
							<p>{post.zipcode}</p>
							<p>{post.address}</p>
							<p>{post.status}</p>
						</div>
					</div>
				)
			})
		) : (
			<div className="center">No Posts Found</div>
		)

		return (
			<div className="container">
				<h4 className="center">Home</h4>
				{postList}
			</div>
		)
	}
}

export default Home
