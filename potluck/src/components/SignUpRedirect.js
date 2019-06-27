import React from "react";
import { Link } from "react-router-dom";

const SignUpRedirect = () => {
	return (
		<section className="loginSection">
			<div className="loginContainer">
				<div className="redirectConfirm">
					<h1 className="loginTitle"> Thank you for signing up!</h1>
					<Link to={"/"} className="signUpLink">
						Please Login
					</Link>
				</div>
			</div>
		</section>
	);
};

export default SignUpRedirect;
