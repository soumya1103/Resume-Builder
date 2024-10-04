import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import loginImg from "../../Images/login-img.png";
import logo from "../../Images/NucleusTeq Logo.png";
import { TextField } from "@mui/material";
import Button from "../../Components/Button/Button";

function Login() {
  return (
    <div class="login-container-outer">
      <div class="login-container-inner">
        <form class="login-form">
          <img src={logo} alt="logo" width="45%" />
          <h1>Login</h1>
          <TextField label="Email" variant="standard" margin="dense" className="login-input" />
          <br />
          <TextField label="Password" type="password" variant="standard" margin="normal" className="login-input" />
          <br />
          <Button className="login-btn">Login</Button>
          <p>
            <Link to="" style={{ textDecoration: "none", color: "#243C76" }}>
              Don't have an account?
            </Link>
            {" | "}
            <Link to="" style={{ textDecoration: "none", color: "#243C76" }}>
              Forgot password?
            </Link>
          </p>
        </form>
        <div>
          <img src={loginImg} alt="login-image" className="login-img" />
        </div>
      </div>
    </div>
  );
}

export default Login;
