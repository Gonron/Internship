import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Route exact path="/" render={props => <Home {...props} someProps={22} />} />
				<Route path="/about" component={About} someMoreProps={44} />
				<Route path="/contact" component={Contact} />
			</div>
		</BrowserRouter>
	)
}

export default App
