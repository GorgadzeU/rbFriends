import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {

	constructor () {
		super ()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	}
	
	render () {
		const filterRobots = this.state.robots.filter( robots => {
			return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase())
		})
		return (
		<div className = 'tc'>
			<h1>RoboFriends</h1>
			<SearchBox searchChange={this.onSearchChange}/>
			<Scroll>
			 <ErrorBoundry>
				<CardList robots={filterRobots}/>
			 </ErrorBoundry>
			</Scroll>
		</div>
	);
	}
	
}

export default App;