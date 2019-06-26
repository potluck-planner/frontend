import React from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { signUp } from "../actions";
import styled from "styled-components";

// const LoginApp = styled.div`
//   width: 100%;
//   height: 100vh;
//   background: linear-gradient(to right, #6a7fdb, #9b9ece);
// `;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 20% auto 10% auto;
  padding: 2%;
  background: rgba(4, 15, 15, 0.5);

  border-top: 2px solid #6a7fdb;
  box-shadow: 0 5px 20px rgba(4, 15, 15, 0.6);
`;

const LoginTitle = styled.h1`
  font-size: 2.5rem;
  color: #fcfffc;
`;

const LoginInput = styled.input`
  margin: 2% auto;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 0.5px solid #acadbc;
  height: 40px;
  padding: 0 0 0 3%;

  &::placeholder {
    padding-left: 2.5%;
    color: #9b9ece;
    font-size: 1rem;
  }
`;
const LoginButton = styled.button`
  width: 25%;
  height: 40px;
  margin: 2% auto;
  border: none;
  background-color: #6a7fdb;
  font-size: 1.1rem;
  box-shadow: 0 3px 10px rgba(4, 15, 15, 0.6);
  border-radius: 3px;
  color: #040f0f;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 11px rgba(4, 15, 15, 0.6);
  }
`;

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
      //   <LoginApp>
      <LoginContainer>
        <LoginForm onSubmit={this.signUp} className="Login">
          <LoginTitle>Potluck Planner</LoginTitle>
          <LoginInput
            type="text"
            name="name"
            value={this.state.credentials.name}
            onChange={this.handleChange}
            placeholder="Name"
          />
          <LoginInput
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <LoginInput
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Password"
          />

          <LoginButton className="loginButton">
            {this.props.registering ? (
              <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
            ) : (
              "Sign Up"
            )}
          </LoginButton>
        </LoginForm>
      </LoginContainer>
      //   </LoginApp>
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
