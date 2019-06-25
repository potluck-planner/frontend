import React from "react";
import { Link } from "react-router-dom";

const SignUpRedirect = () => {
  return (
    <div>
      <h1> Thank you for signing up!</h1>
      <Link to={"/"}>Please Login</Link>
    </div>
  );
};

export default SignUpRedirect;
