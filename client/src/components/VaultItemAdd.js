import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";

const VaultItemAdd = ({ onAdd, onGenerate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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

  const handleGenerate = () => {
    const generatedPassword = onGenerate();
    setPassword(generatedPassword);
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
            type={showPassword ? "text" : "password"}
            value={password}
            label="Password"
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
                  <IconButton onClick={handleGenerate}>
                    <LockResetIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
