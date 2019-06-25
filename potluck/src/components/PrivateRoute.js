import React from "react";
import { Route, Redirect, NavLink } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	console.log(rest);
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.getItem("token")) {
					// return <Component {...props} />;
					return (
						<>
							<div className="navBar">
								<NavLink exact to={`/`} className="navLink">
									Events List
								</NavLink>
								<NavLink exact to={`/addevent`} className="navLink">
									Add Events
								</NavLink>
							</div>
							<Component {...props} {...rest} />
						</>
					);
				}
				return <Redirect to="/login" />;
			}}
		/>
	);
};

export default PrivateRoute;
