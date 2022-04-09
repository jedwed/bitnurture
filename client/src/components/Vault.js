import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import VaultItem from "./VaultItem";
import VaultFooter from "./VaultFooter";

const Vault = ({ vault, onAdd, onLogout, onEdit, onDelete }) => {
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [viewRedirect, setViewRedirect] = useState(false);
  return (
    <div>
      <div className="vault">
        {vault.map((vaultItem) => {
          <VaultItem />;
        })}
      </div>
      <VaultFooter onLogout={onLogout} />
      {logoutRedirect && <Navigate replace to="/" />}
      {viewRedirect && <Navigate replace to="/vault/viewItem" />}
    </div>
  );
};

export default Vault;
