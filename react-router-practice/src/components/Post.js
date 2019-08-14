import React, { Component } from 'react'
import axois from 'axios'

class Post extends Component {
	state = {
		post: []
	}
	componentDidMount() {
		let id = this.props.match.params.post_id
		axois
			.get('http://localhost:4000/' + id)
			.then(res => {
				this.setState({
					post: res.data
				})
			})
			.catch(err => console.log('Error:', err))
	}
	render() {
		const post = this.state.post
		console.log(post)
		const postDetails = post.data ? (
			post.data.map(post => {
				return (
					<div className="post" key={post.cvr}>
						<h4 className="center">{post.company_name}</h4>
						<p>{post.cvr}</p>
						<p>{post.zipcode}</p>
						<p>{post.address}</p>
						<p>{post.status}</p>
					</div>
				)
			})
		) : (
			<div className="center">Loading post...</div>
		)
		return <div className="container">{postDetails}</div>
	}
}

export default Post
