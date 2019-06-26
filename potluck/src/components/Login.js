import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { login, getUsers } from "../actions";
import { Link } from "react-router-dom";
import { Logo } from "./img/logo.png";

class Login extends React.Component {
	state = {
		credentials: {
			username: "",
			password: ""
		}
	};

	handleChange = event => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[event.target.name]: event.target.value
			}
		});
	};

	login = event => {
		event.preventDefault();
		this.props
			.login(this.state.credentials)
			// .then(this.props.getUsers(`http://localhost:5000/users/`))
			.then(
				this.props.getUsers(`https://potlucker-planner.herokuapp.com/users/`)
			)
			.then(() => this.props.history.push(`/`));
	};

	render() {
		return (
			<section className="loginSection">
				<div className="loginContainer">
					<form onSubmit={this.login} className="loginForm">
						<h1 className="loginTitle">Potluck Planner</h1>
						<input
							className="loginInput"
							type="text"
							name="username"
							value={this.state.credentials.username}
							onChange={this.handleChange}
							placeholder="Username"
						/>
						<input
							className="loginInput"
							type="password"
							name="password"
							value={this.state.credentials.password}
							onChange={this.handleChange}
							placeholder="Password"
						/>
						<button className="loginButton">
							{this.props.loggingIn ? (
								<Loader
									type="ThreeDots"
									color="#1f2a38"
									height="12"
									width="26"
								/>
							) : (
								"Sign in"
							)}
						</button>
					</form>
					Need to create an account?
					<Link to="/signup" className="signUpLink">
						Sign Up
					</Link>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	error: state.loginReducer.error,
	loggingIn: state.loginReducer.loggingIn,
	allUsers: state.fetchUsers.allUsers
});

export default connect(
	mapStateToProps,
	{ login, getUsers }
)(Login);
