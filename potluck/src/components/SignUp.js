import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { signUp } from "../actions";

class SignUp extends React.Component {
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

  signUp = event => {
    event.preventDefault();
    const URL = "https://potlucker-planner.herokuapp.com/users/register";
    this.props.signUp(URL, this.state.credentials);
    this.props.history.push("/redirect");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signUp} className="Login">
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
            {this.props.registering ? (
              <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.signUpReducer.error,
  registering: state.signUpReducer.registering
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
