import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { fabClasses } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const VaultItem = ({ vaultItem }) => {
  const [view, setView] = useState(fabClasses);
  const handleClickView = () => {
    setView(true);
  };

  const handleClose = () => {
    setView(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={vaultItem.password} secondary={vaultItem.name} />
        <ListItemIcon>
          <EditIcon edge="end" />
        </ListItemIcon>
      </ListItem>
    </>
  );
};

export default VaultItem;
