import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../Images/login-img.jpeg";
import logo from "../../Images/NucleusTeq Logo.png";
import { TextField } from "@mui/material";
import { loginUser } from "../../Redux/Authentication/AuthenticationAction";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../Api/apiService";
import { validationPatterns, validTLDs } from "../../Validation/constant";

function Login() {
  const [selectedRole, setSelectedRole] = useState("ROLE_EMPLOYEE");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [credentialEmailError, setCredentialEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.token) {
      if (auth.role === "ROLE_EMPLOYEE") {
        navigate("/dashboard");
      }
    }
  }, [auth]);

  const handleInputChange = (setter, errorSetter) => (e) => {
    setter(e.target.value);
    errorSetter("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isCredentialEmailValid = validateCredentialEmail();
    const isPasswordValid = validatePassword();
    if (selectedRole === "ROLE_EMPLOYEE" && isCredentialEmailValid && isPasswordValid) {
      try {
        // const encodedPassword = btoa(password);
        const encodedPassword = password;
        const response = await login(email, encodedPassword);
        // if (response?.status === 200 || response?.status === 201) {
        //   setToastMessage("Logged in successfully!");
        //   setShowToast(true);
        //   setToastType("success");
        // }
        dispatch(loginUser(response.data));
        window.localStorage.setItem("authtoken", response.data.token);
      } catch (error) {
        // setToastMessage(error.response.data.message);
        // setShowToast(true);
        // setToastType("error");
      }
    }
  };

  const validateCredentialEmail = () => {
    if (selectedRole === "admin") {
      if (!validationPatterns.email.test(email)) {
        setCredentialEmailError("Please enter a valid email.");
        return false;
      }
      const emailTLD = email.substring(email.lastIndexOf("."));
      if (!validTLDs.includes(emailTLD)) {
        setCredentialEmailError(`Email must end with a valid domain`);
        return false;
      }
    }
    setCredentialEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 1) {
      setPasswordError("Password can not be empty.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  return (
    <div class="login-container-outer">
      <div class="login-container-inner">
        <form class="login-form" onSubmit={handleLogin}>
          <img src={logo} alt="logo" width="50%" />
          <h1>Login</h1>
          <TextField
            label="Email"
            variant="standard"
            margin="dense"
            className="login-input"
            onChange={handleInputChange(setEmail, setCredentialEmailError)}
          />
          {credentialEmailError && (
            <div className="login-error-container">
              <p className="login-error-text">{credentialEmailError}</p>
            </div>
          )}
          <br />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            margin="normal"
            className="login-input"
            onChange={handleInputChange(setPassword, setPasswordError)}
          />
          {passwordError && (
            <div className="login-error-container">
              <p className="login-error-text">{passwordError}</p>
            </div>
          )}
          <br />
          <Button type="submit" className="login-btn">
            Login
          </Button>
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
