import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import VaultItem from "./VaultItem";
import VaultFooter from "./VaultFooter";
import List from "@mui/material/List";

const Vault = ({ vault, onAdd, onLogout, onEdit, onDelete, onGenerate }) => {
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [viewRedirect, setViewRedirect] = useState(false);

  const handleLogout = () => {
    onLogout();
    setLogoutRedirect(true);
  };

  return (
    <div>
      <List>
        {vault.map((vaultItem) => (
          <VaultItem
            vaultItem={vaultItem}
            key={vaultItem.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </List>
      <VaultFooter
        onLogout={handleLogout}
        onAdd={onAdd}
        onGenerate={onGenerate}
      />
      {logoutRedirect && <Navigate replace to="/" />}
      {viewRedirect && <Navigate replace to="/vault/viewItem" />}
    </div>
  );
};

export default Vault;
