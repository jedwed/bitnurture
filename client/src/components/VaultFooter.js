import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import VaultItemAdd from "./VaultItemAdd";
import { Link } from "react-router-dom";

const FormFooter = ({ onLogout, onAdd, onGenerate }) => {
  return (
    <div className="footer">
      <Button variant="text" onClick={onLogout}>
        <LogoutIcon />
        Logout
      </Button>

      <VaultItemAdd onAdd={onAdd} onGenerate={onGenerate} />
    </div>
  );
};

export default FormFooter;
