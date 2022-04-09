import { useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import FormFooter from "./FormFooter";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!password) {
      alert("Please enter your password");
    }

    const err = await onLogin(email, password);
    if (err) {
      alert(err);
      return;
    }

    setEmail("");
    setPassword("");
    setRedirect(true);
  };

  return (
    <div>
      <div className="inputFields">
        <TextField
          type="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          fullWidth
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Master Password"
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          fullWidth
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <FormFooter onSubmit={handleSubmit} />
      {redirect && <Navigate replace to="/vault" />}
    </div>
  );
};

export default Login;
