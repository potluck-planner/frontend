import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./img/logo.png";

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    // extract full name from allUsers array by matching id with current activeUser
    const myName = this.props.allUsers.find(
      user => user.id === this.props.activeUser.id
    )
      ? this.props.allUsers.find(user => user.id === this.props.activeUser.id)
          .name
      : null;
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
                  <div className="dashTitle">
                    <img
                      src={logo}
                      alt="Potluck Planner Logo"
                      className="logo"
                    />
                    Welcome, {myName}
                  </div>
                  <div className="navBar">
                    <NavLink exact to={`/`} className="navLink">
                      Upcoming Events
                    </NavLink>
                    <NavLink exact to={`/createevent`} className="navLink">
                      Plan New Event
                    </NavLink>
                  </div>
                  <button
                    className="logOutButton"
                    onClick={() => {
                      localStorage.removeItem("token");
                      props.history.push(`/`);
                    }}
                  >
                    Logout
                  </button>
                </div>
                <div className="navBar" />
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
  activeUser: state.loginReducer.activeUser,
  allUsers: state.fetchUsers.allUsers
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
