import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import { getData } from "./actions";
import { connect } from "react-redux";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import EventsList from "./components/EventsList";
import AddEvent from "./components/AddEvent";
import EventLink from "./components/EventLink";
import jsonwebtoken from "jsonwebtoken";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null
		};
	}

	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/users/${
			this.state.user.username
		}/events`;
		// const URL = `https://potlucker-planner.herokuapp.com/users/`;
		this.props.getData(URL);
	}

	render() {
		console.log(this.state.user);
		console.log(this.props);
		return (
			<Router>
				<div className="App">
					<Route
						exact
						path="/"
						render={() => {
							return <Link to={`/login`}>Login</Link>;
						}}
					/>
					<Route
						exact
						path="/login"
						render={props => <Login {...props} {...this.state} />}
					/>
					<Route
						exact
						path="/users"
						render={() => {
							if (this.props.isLoggedIn === true) {
								return (
									<Link to={`/users/${this.state.user.username}/events`}>
										My Events
									</Link>
								);
							} else {
								return <Link to={`/login`}>Please Login</Link>;
							}
						}}
					/>
					<PrivateRoute
						exact
						path={`/users/${this.state.user.username}/events`}
						component={EventsList}
						{...this.state}
					/>
					<PrivateRoute
						exact
						path={`/users/${this.state.user.username}/addevent`}
						component={AddEvent}
						{...this.state}
					/>
					<PrivateRoute
						exact
						path="/event/:id"
						component={EventLink}
						{...this.state}
					/>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	// error: state.eventReducer.error,
	fetchingEvents: state.fetchDataReducer.fetchingEvents,
	isLoggedIn: state.loginReducer.isLoggedIn
});

export default connect(
	mapStateToProps,
	{ getData }
)(App);
