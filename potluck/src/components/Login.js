import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { login } from "../actions";
import jsonwebtoken from "jsonwebtoken";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    userID: jsonwebtoken.decode(localStorage.getItem("token"))
      ? jsonwebtoken.decode(localStorage.getItem("token")).id
      : null
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
    this.props.login(this.state.credentials);
    // .then(response => {
    //   if (response) {
    this.props.history.push(`/users/`);
    //   }
    // });
  };

  render() {
    console.log(this.props.isLoggedIn);
    return (
      <div>
        <form onSubmit={this.login} className="Login">
          <h1>Potluck Planner</h1>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            className="loginInput"
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            className="loginInput"
            placeholder="password"
          />
          <button className="loginButton">
            {this.props.loggingIn ? (
              <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // error: state.eventReducer.error,
  loggingIn: state.loggingIn,
  isLoggedIn: state.loginReducer.isLoggedIn
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
