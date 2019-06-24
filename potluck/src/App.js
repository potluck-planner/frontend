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
    const URL = `https://potlucker-planner.herokuapp.com/users/1/events`;
    // const URL = `https://potlucker-planner.herokuapp.com/users/${id}/events`;
    // this.props.getData(URL);
  }

  render() {
    console.log(this.state.userID);
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Route exact path="/users/login" component={Login} />
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
  // getData: state.eventReducer.getData
});

export default connect(
  mapStateToProps,
  { getData }
)(App);
