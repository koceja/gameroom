import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/home.js';
import Groups from '../pages/groups/groups.js';
import Profile from '../pages/profile/profile.js';
import Login from '../pages/login/login.js';
import Create from '../pages/login/create.js';
import PrivateRoute from './auth.js';



class App extends React.Component {

	isLoggedIn() {
		const username = localStorage.getItem('username');
		return (!!username);
	}

	render() {
		const authed = this.isLoggedIn();
		return (
			<div>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/create">
						<Create />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<PrivateRoute component={<Groups />} authed={authed} path="/groups" />
					<PrivateRoute component={<Profile />} authed={authed} path="/profile" />
				</Switch>
			</div>
				
		);
	}
	
}

export default App;
