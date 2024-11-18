import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../Images/login-img.jpeg";
import logo from "../../Images/NucleusTeq Logo.png";
import { TextField } from "@mui/material";
import { loginUser } from "../../Redux/Authentication/AuthenticationAction";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login, resetPassword, sendOtp } from "../../Api/apiService";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";
import { validationPatterns, validTLDs } from "../../Validation/constant";

function Login() {
  const [selectedRole, setSelectedRole] = useState("ROLE_EMPLOYEE");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [credentialEmailError, setCredentialEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [emailForgetPassword, setEmailForgetPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.token) {
      if (auth.role === "ROLE_EMPLOYEE") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (auth.role === "ROLE_HR") {
        setSelectedRole("ROLE_HR");
        setTimeout(() => {
          navigate("/dashboardHr");
        }, 2000);
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
    if ((selectedRole === "ROLE_EMPLOYEE" || selectedRole === "ROLE_HR") && isCredentialEmailValid && isPasswordValid) {
      try {
        const encodedPassword = btoa(password);
        const response = await login(email, encodedPassword);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.data?.message || "Login successful.", {
            autoClose: 2000,
          });
        }
        dispatch(loginUser(response.data));
        window.localStorage.setItem("authtoken", response.data.token);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.", {
          autoClose: 2000,
        });
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

  const submitChangePassword = async () => {
    try {
      const response = await resetPassword(emailForgetPassword, otp, btoa(newPassword));
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Password reset successfully.", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp(emailForgetPassword);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message || "Otp sent successfully.", {
          autoClose: 2000,
        });
        setTimeout(() => {
          setShowEmailModal(false);
          setShowChangePasswordModal(true);
        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    }
  };

  const onCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const onCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleForgetPassword = () => {
    setShowEmailModal(true);
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
            <button onClick={handleForgetPassword} className="login-link">
              Forgot password?
            </button>
          </p>
        </form>
        <img src={loginImg} alt="login-image" className="login-img" />
      </div>
      <Modal show={showEmailModal} onClose={onCloseEmailModal} height="110px" width="300px">
        <Input
          className="profile-input-field-password"
          type="email"
          label="Enter Email"
          value={emailForgetPassword}
          onChange={(e) => setEmailForgetPassword(e.target.value)}
        />
        <Button className="change-btn" onClick={handleSendOtp}>
          Send Otp
        </Button>
      </Modal>
      <Modal show={showChangePasswordModal} onClose={onCloseChangePasswordModal} height="240px" width="310px">
        <Input
          className="profile-input-field-password"
          type="email"
          label="Enter Email"
          value={emailForgetPassword}
          onChange={(e) => setEmailForgetPassword(e.target.value)}
        />
        <Input className="profile-input-field-password" type="text" label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Input
          className="profile-input-field-password"
          type="password"
          label="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button className="change-btn" onClick={submitChangePassword}>
          Submit
        </Button>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Login;
