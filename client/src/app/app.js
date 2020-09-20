import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/home.js';
import Groups from '../pages/groups/groups.js';
import Profile from '../pages/profile/profile.js';
import Login from '../pages/login/login.js';
import Create from '../pages/login/create.js';
import PrivateRoute from './auth.js';



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			authed: (!!localStorage.getItem('username'))
		}
		this.logIn = this.logIn.bind(this);
	}

	logIn() {
		const username = localStorage.getItem('username');
		this.setState({authed: (!!username)});
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/login">
						<Login logIn={this.logIn} />
					</Route>
					<Route exact path="/create">
						<Create />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<PrivateRoute component={Groups} authed={this.state.authed} path="/groups/:group" />
					<PrivateRoute component={Groups} authed={this.state.authed} path="/groups" />
					<PrivateRoute component={Profile} authed={this.state.authed} path="/profile" />
				</Switch>
			</div>
				
		);
	}
	
}

export default App;
