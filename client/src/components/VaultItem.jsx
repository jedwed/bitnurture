import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const VaultItem = ({ vaultItem, onEdit, onDelete, onGenerate }) => {
  const [open, setOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [name, setName] = useState(vaultItem.name);
  const [username, setUsername] = useState(vaultItem.username);
  const [password, setPassword] = useState(vaultItem.password);
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
      setErrorAlert("Please enter the name of the Vault Item");
      return;
    }

    if (!username) {
      setErrorAlert("Please enter the username of the Vault Item");
      return;
    }

    if (!password) {
      setErrorAlert("Please enter the password of the Vault Item");
      return;
    }

    await onEdit(vaultItem.id, name, username, password);
    setOpen(false);
  };

  const handleDelete = async () => {
    await onDelete(vaultItem.id);
    setOpen(false);
  };

  const handleGenerate = () => {
    const generatedPassword = onGenerate();
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    // Copies the password to clipboard
    navigator.clipboard.writeText(password);
    setCopyAlert(true);
  };

  const handleCloseCopyAlert = () => {
    setCopyAlert(false);
  };

  const handleCloseErrorAlert = () => {
    setErrorAlert("");
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={vaultItem.name}
          secondary={vaultItem.username}
          sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
        />
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon edge="end" />
        </IconButton>
        <IconButton onClick={handleClickOpen}>
          <EditIcon edge="end" />
        </IconButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View & Edit Vault Item</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="filled"
            fullWidth
          />
          <TextField
            type="text"
            label="Username"
            value={username}
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
          <Button style={{ color: "red" }} onClick={handleDelete}>
            <DeleteIcon />
            <Typography>Delete</Typography>
          </Button>
          <Button variant="text" onClick={handleClose}>
            <Typography>Cancel</Typography>
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            <Typography>Edit</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={copyAlert}
        autoHideDuration={6000}
        onClose={handleCloseCopyAlert}
      >
        <Alert onClose={handleCloseCopyAlert} severity="success">
          Password successfully copied!
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(errorAlert)}
        autoHideDuration={6000}
        onClose={handleCloseErrorAlert}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          {errorAlert}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VaultItem;
