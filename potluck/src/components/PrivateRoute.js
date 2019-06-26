import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null
		};
	}

	componentDidMount() {
		this.setState({
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null
		});
	}

	render() {
		const { component: Component, ...rest } = this.props;
		const promise = new Promise(function(resolve) {
			resolve("done");
		});
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
									<div>Welcome {this.state.user.username}</div>
									<button
										// onClick={() => {
										// 	localStorage.removeItem("token");
										// 	props.history.push(`/`);
										// }}
										onClick={() => {
											promise
												.then(() => localStorage.removeItem("token"))
												.then(() => props.history.push(`/`));
										}}
									>
										Logout
									</button>
								</div>
								<div className="navBar">
									<NavLink exact to={`/`} className="navLink">
										Events List
									</NavLink>
									<NavLink exact to={`/addevent`} className="navLink">
										Add Events
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

// functional construction
// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	console.log(rest);
// 	return (
// 		<Route
// 			{...rest}
// 			render={props => {
// 				if (localStorage.getItem("token")) {
// 					return (
// 						<>
// 							<div className="logOut">
// 								{/* fix this - need to get privateroute refactored so we can extract username */}
// 								<div>Welcome {rest.user.username}</div>
// 								<button
// 									onClick={() => {
// 										localStorage.removeItem("token");
// 										props.history.push(`/`);
// 									}}
// 								>
// 									Logout
// 								</button>
// 							</div>
// 							<div className="navBar">
// 								<NavLink exact to={`/`} className="navLink">
// 									Events List
// 								</NavLink>
// 								<NavLink exact to={`/addevent`} className="navLink">
// 									Add Events
// 								</NavLink>
// 							</div>
// 							<Component {...props} {...rest} />
// 						</>
// 					);
// 				}
// 				return <Redirect to="/login" />;
// 			}}
// 		/>
// 	);
// };

export default PrivateRoute;
