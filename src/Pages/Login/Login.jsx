import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import loginImg from "../../Images/login-img.jpeg";
import logo from "../../Images/NucleusTeq Logo.png";
import { TextField } from "@mui/material";
import Button from "../../Components/Button/Button";

function Login() {
  return (
    <div class="login-container-outer">
      <div class="login-container-inner">
        <form class="login-form">
          <img src={logo} alt="logo" width="50%" />
          <h1>Login</h1>
          <TextField label="Email" variant="standard" margin="dense" className="login-input" />
          <br />
          <TextField label="Password" type="password" variant="standard" margin="normal" className="login-input" />
          <br />
          <Button className="login-btn">Login</Button>
          <p>
            <Link to="/forgotPassword" className="login-link">
              Forgot password?
            </Link>
          </p>
        </form>
        <img src={loginImg} alt="login-image" className="login-img" />
      </div>
    </div>
  );
}

export default Login;
