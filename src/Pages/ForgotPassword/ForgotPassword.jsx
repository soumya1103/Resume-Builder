import React from "react";
import Button from "../../Components/Button/Button";
import loginImg from "../../Images/login-img.jpeg";
import { TextField } from "@mui/material";
import "./ForgotPassword.css";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div class="login-container-outer">
      <div class="forgotPassword-container-inner">
        <form class="forgotPassword-form">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeftLong} className="back-icon" />
          </Link>
          <h1>Forgot Password ?</h1>
          <TextField label="Enter your email" variant="outlined" className="forgotPassword-input" />
          <br />
          <Button className="forgotPassword-btn">Send</Button>
        </form>
        <img src={loginImg} alt="login-image" className="login-img" />
      </div>
    </div>
  );
}

export default ForgotPassword;
