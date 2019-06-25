import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import EventsList from "./components/EventsList";
import AddEvent from "./components/AddEvent";
import EventLink from "./components/EventLink";
import SignUp from "./components/SignUp";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<Router>
				<div className="App">
					<Route
						exact
						path="/login"
						render={props => {
							return (
								<div>
									<Login {...props} {...this.state} />
									<Link exact to="/signup">
										Sign Up
									</Link>
								</div>
							);
						}}
					/>
					<Route
						exact
						path="/signup"
						render={props => {
							return <SignUp {...props} {...this.state} />;
						}}
					/>
					<PrivateRoute
						exact
						path={`/`}
						component={EventsList}
						{...this.state}
						{...this.props}
					/>
					<PrivateRoute
						exact
						path={`/addevent`}
						component={AddEvent}
						{...this.state}
						{...this.props}
					/>
					<PrivateRoute
						exact
						path="/event/:id"
						component={EventLink}
						{...this.state}
						{...this.props}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
