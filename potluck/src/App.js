import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import EventsList from "./components/EventsList";
import AddEvent from "./components/AddEvent";
import EventLink from "./components/EventLink";
import SignUpRedirect from "./components/SignUpRedirect";
import SignUp from "./components/SignUp";

class App extends React.Component {
<<<<<<< HEAD
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
									<Login {...props} />
									<Link to="/signup">Sign Up</Link>
								</div>
							);
						}}
					/>
					<Route
						exact
						path="/signup"
						render={props => {
							return <SignUp {...props} />;
						}}
					/>
					<Route exact path="/redirect" component={SignUpRedirect} />
					<PrivateRoute exact path={`/`} component={EventsList} />
					<PrivateRoute exact path={`/createevent`} component={AddEvent} />
					<PrivateRoute exact path="/event/:id" component={EventLink} />
				</div>
			</Router>
		);
	}
=======
  render() {
    console.log(this.props);
    return (
      <div>
        <Router>
          <div className="App">
            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <div>
                    <Login {...props} />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={props => {
                return <SignUp {...props} />;
              }}
            />
            <Route exact path="/redirect" component={SignUpRedirect} />
            <PrivateRoute exact path={`/`} component={EventsList} />
            <PrivateRoute exact path={`/addevent`} component={AddEvent} />
            <PrivateRoute exact path="/event/:id" component={EventLink} />
          </div>
        </Router>
      </div>
    );
  }
>>>>>>> d721253b09908dd8c7113b8ffa6874ef9cd9d55a
}

export default App;
