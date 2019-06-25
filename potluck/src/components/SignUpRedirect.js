import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img from "./img/redirect.jpg";

const ThankYouContainer = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${img});
  background-size: 100%;
  height: 100vh;
  text-align: center;
  margin: auto;
`;

const ThankYouCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(252, 255, 252, 0.5);
  border-radius: 20px;
  padding: 5% 3%;
  width: 30%;
  height: auto;
  margin: auto;
`;

const ThankYouTitle = styled.h1`
  font-size: 2rem;
  color: #040f0f;
`;

const ThankYouLink = styled(Link)`
  font-size: 1.4rem;
  color: #040f0f;
  text-decoration: none;
  width: 50%;
  margin: auto;
  padding: 0;
  font-weight: 400;

  &:hover {
    opacity: 0.7;
    transition: 0.5sec ease;
  }
`;

const SignUpRedirect = () => {
  return (
    <ThankYouContainer>
      <ThankYouCard>
        <ThankYouTitle> Thank you for signing up!</ThankYouTitle>
        <ThankYouLink to={"/"}>Please Login</ThankYouLink>
      </ThankYouCard>
    </ThankYouContainer>
  );
};

export default SignUpRedirect;
