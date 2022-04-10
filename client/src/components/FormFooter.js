import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const FormFooter = ({ onSubmit }) => {
  return (
    <div className="footer">
      <Button variant="text" component={Link} to="/">
        <Typography>Cancel</Typography>
      </Button>

      <Button variant="contained" onClick={onSubmit}>
        <Typography>Submit</Typography>
      </Button>
    </div>
  );
};

export default FormFooter;
