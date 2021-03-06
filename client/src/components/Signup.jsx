import React from "react";
import { useState } from "react";
import FormFooter from "./FormFooter";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const checkPassword = () => {
    if (password.length < 12) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!email) {
      setAlert("Please enter your email");
      return;
    }

    if (!checkPassword()) {
      setAlert("Master password must be at least 12 characters");
      return;
    }

    if (password !== confirmPassword) {
      setAlert("The two passwords do not match");
      return;
    }

    const err = await onSignup(email, password);
    // An error will occur if the email is already registered
    if (err) {
      setAlert(err);
      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRedirect(true);
  };

  const handleCloseAlert = () => {
    setAlert("");
  };

  return (
    <>
      <div className="signUp">
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
        <Typography variant="caption">
          The master password is the password used to access, encrypt and
          decrypt your entire vault. Make sure it is secure (at least 12
          characters in length) and hard to guess. Make sure you remember your
          master password. Once forgotten, it can't be recovered.
        </Typography>
        <div className="inputFields">
          <TextField
            type={showPassword ? "text" : "password"}
            label="Confirm Master Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
      <FormFooter onSubmit={handleSubmit} />
      {redirect && <Navigate replace to="/" />}
      <Snackbar
        open={Boolean(alert)}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;
