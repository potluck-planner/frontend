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
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #6a7fdb, #9b9ece);
`;

const LoginContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUpLink = styled(Link)`
  margin: auto;
  width: 10%;
  border: none;
  background-color: #6a7fdb;
  padding: 1% 0;
  font-size: 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(4, 15, 15, 0.2);
  border-radius: 3px;
  color: #040f0f;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 9px rgba(4, 15, 15, 0.2);
  }
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null
		};
	}

	render() {
		console.log(this.props);
		return (
            <AppContainer>
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
					<PrivateRoute exact path={`/addevent`} component={AddEvent} />
					<PrivateRoute exact path="/event/:id" component={EventLink} />
				</div>
			</Router>
      </AppContainer>
		);
	}
}

export default App;
