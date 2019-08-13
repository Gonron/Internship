import React from 'react'

// higher order component
const Rainbow = WrappedComponent => {
	const colours = ['red', 'orange', 'yellow']
	const randomColour = colours[Math.floor(Math.random() * 3)]
	const className = randomColour + '-text'

	// super charged component
	return props => {
		return (
			<div className={className}>
				<WrappedComponent {...props} />
			</div>
		)
	}
}

export default Rainbow
