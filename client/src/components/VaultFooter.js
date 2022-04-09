import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const FormFooter = ({ onLogout, onAdd }) => {
  return (
    <div className="footer">
      <Button variant="text" onClick={onLogout}>
        <LogoutIcon />
        Logout
      </Button>

      <Button variant="contained" onClick={onAdd}>
        Submit
      </Button>
    </div>
  );
};

export default FormFooter;
