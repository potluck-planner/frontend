import React from "react";
import { Route, Redirect, NavLink } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          // return <Component {...props} />;
          return (
            <>
              <div className="navBar">
                <NavLink exact to="/users/:id/events" className="navLink">
                  Events List
                </NavLink>
                <NavLink exact to="/users/:id/addevent" className="navLink">
                  Add Events
                </NavLink>
              </div>
              {/* <Component {...props} /> */}
            </>
          );
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
