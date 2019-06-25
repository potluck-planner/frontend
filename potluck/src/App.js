import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import { getEvents } from "./actions";
import { connect } from "react-redux";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import EventsList from "./components/EventsList";
import AddEvent from "./components/AddEvent";
import EventLink from "./components/EventLink";
import SignUp from "./components/SignUp";
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
    this.props.getEvents(URL);
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
            path="/users"
            render={() => {
              if (this.props.isLoggedIn === true) {
                return (
                  <Link to={`/users/${this.state.user.username}/events`}>
                    My Events
                  </Link>
                );
              } else {
                return <Link to={`/`}>Please Login</Link>;
              }
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
            path={`/users/${this.state.user.username}/events`}
            component={EventsList}
            {...this.state}
            {...this.props}
          />
          <PrivateRoute
            exact
            path={`/users/${this.state.user.username}/addevent`}
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

const mapStateToProps = state => ({
  error: state.fetchDataReducer.error,
  fetchingEvents: state.fetchDataReducer.fetchingEvents,
  isLoggedIn: state.loginReducer.isLoggedIn,
  events: state.fetchDataReducer.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(App);
