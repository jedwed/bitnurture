import React from "react";
import { useState } from "react";
import FormFooter from "./FormFooter";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPassword = () => {
    if (password.length < 12) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!checkPassword()) {
      alert("Master password must be at least 12 characters");
      return;
    }

    if (password != confirmPassword) {
      alert("The two passwords do not match");
      return;
    }
    onSignup(email, password);
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };

  return (
    <div>
      <div className="inputFields">
        <TextField
          type="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          fullWidth
        />
        <TextField
          type="password"
          label="Master Password"
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
          fullWidth
        />
      </div>
      <Typography variant="caption">
        The master password is the password used to access, encrypt and decrypt
        your entire vault. Make sure it is secure (at least 12 characters in
        length) and hard to guess. Make sure you remember your master password.
        Once forgotten, it can't be recovered.
      </Typography>
      <div className="inputFields">
        <TextField
          type="password"
          label="Confirm Master Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="standard"
          fullWidth
        />
      </div>
      <FormFooter onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;
