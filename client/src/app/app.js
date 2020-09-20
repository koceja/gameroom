import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home/home.js';
import Groups from '../pages/groups/groups.js';
import Profile from '../pages/profile/profile.js';
import Login from '../pages/login/login.js';
import Create from '../pages/login/create.js';



class App extends React.Component {
	render() {
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
					<Route exact path="/groups">
						<Groups />
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
				</Switch>
			</div>
				
		);
	}
	
}

export default App;
