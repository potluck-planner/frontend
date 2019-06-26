import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
	render() {
		const { component: Component, ...rest } = this.props;
		console.log(this.props);
		console.log(rest);
		return (
			<Route
				{...rest}
				render={props => {
					if (localStorage.getItem("token")) {
						return (
							<>
								<div className="logOut">
									<div>Welcome {this.props.activeUser.username}</div>
									<button
										onClick={() => {
											localStorage.removeItem("token");
											props.history.push(`/`);
										}}
									>
										Logout
									</button>
								</div>
								<div className="navBar">
									<NavLink exact to={`/`} className="navLink">
										Events List
									</NavLink>
									<NavLink exact to={`/createevent`} className="navLink">
										Create Event
									</NavLink>
								</div>
								<Component {...this.props} {...props} />
							</>
						);
					}
					return <Redirect to="/login" />;
				}}
			/>
		);
	}
}

const mapStateToProps = state => ({
	activeUser: state.loginReducer.activeUser
});

export default connect(
	mapStateToProps,
	null
)(PrivateRoute);
