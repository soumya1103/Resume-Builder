import React from "react";
import "../Register/Register.css";
import { TextField } from "@mui/material";
import Button from "../../Components/Button/Button";


function Register() {
  console.log("register page");
  return (
    <div className="register-container-outer">
      <div className="register-container-inner">
        <form className="register-form">
       
          <h1>Register</h1>
          <TextField label="Username" variant="outlined" margin="dense" className="register-input" />
          <br />
          <TextField label="Email" variant="outlined" margin="dense" className="register-input" />
          <br />
          <TextField label="Password" type="password" variant="outlined" margin="normal" className="register-input" />
          <br />
   
          <br />
          <Button className="register-btn">Register</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
