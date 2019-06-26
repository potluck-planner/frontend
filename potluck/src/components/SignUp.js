import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { signUp } from "../actions";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      name: ""
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
      <section className="loginSection">
        <div className="loginContainer">
          <form onSubmit={this.signUp} className="loginForm">
            <h2 className="loginTitle">Potluck Planner</h2>
            <input
              className="loginInput"
              type="text"
              name="name"
              value={this.state.credentials.name}
              onChange={this.handleChange}
              placeholder="Name"
            />
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
              {this.props.registering ? (
                <Loader
                  type="ThreeDots"
                  color="#1f2a38"
                  height="12"
                  width="26"
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          Already have an account?{" "}
          <Link to="/login" class="signUpLink">
            Login In
          </Link>
        </div>
      </section>
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
