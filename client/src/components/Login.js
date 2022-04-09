import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import FormFooter from "./FormFooter";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
      <FormFooter />
    </div>
  );
};

export default Login;
