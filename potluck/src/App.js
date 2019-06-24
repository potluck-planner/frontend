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
      userID: jsonwebtoken.decode(localStorage.getItem("token"))
        ? jsonwebtoken.decode(localStorage.getItem("token")).id
        : null
    };
  }

  componentDidMount() {
    const URL = `https://potlucker-planner.herokuapp.com/users/${
      this.state.userID
    }/events`;
    // const URL = `https://potlucker-planner.herokuapp.com/users/${id}/events`;
    this.props.getData(URL);
  }

  render() {
    console.log(this.state.userID);
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => {
              return <Link to={`/users/login`}>Login</Link>;
            }}
          />
          <Route
            exact
            path="/users/login"
            render={props => <Login {...props} {...this.state} />}
          />
          <Route
            exact
            path="/users"
            render={props => {
              if (this.props.isLoggedIn === true) {
                return (
                  <Link to={`/users/${this.state.userID}/events`}>
                    My Events
                  </Link>
                );
              } else {
                return <Link to={`/users/login`}>Please Login</Link>;
              }
            }}
          />
          <PrivateRoute exact path="/users/:id/events" component={EventsList} />
          <PrivateRoute exact path="/users/:id/addevent" component={AddEvent} />
          <PrivateRoute exact path="/event/:id" component={EventLink} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  // error: state.eventReducer.error,
  fetchingEvents: state.fetchingEvents,
  isLoggedIn: state.loginReducer.isLoggedIn
});

export default connect(
  mapStateToProps,
  { getData }
)(App);
