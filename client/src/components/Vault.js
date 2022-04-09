import React from "react";
import VaultItem from "./VaultItem";

const Vault = ({ vault, onAdd, onLogout, onEdit, onDelete }) => {
  return (
    <div>
      <div className="vault">
        {vault.map((vaultItem) => {
          <VaultItem />;
        })}
      </div>
      <VaultFooter onAdd={onAdd} onLogout={onLogout} />
    </div>
  );
};

export default Vault;
