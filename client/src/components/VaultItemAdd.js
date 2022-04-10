import { useState } from "react";
import FormFooter from "./FormFooter";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

const VaultItemAdd = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!name) {
      alert("Please enter the name of the Vault Item");
      return;
    }

    if (!username) {
      alert("Please enter the username of the Vault Item");
      return;
    }

    if (!password) {
      alert("Please enter the password of the Vault Item");
      return;
    }

    await onAdd(name, username, password);
    setName("");
    setUsername("");
    setPassword("");
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        <AddIcon />
        New Vault Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Vault Item</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            variant="filled"
            fullWidth
          />
          <TextField
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            fullWidth
          />
          <TextField
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VaultItemAdd;
