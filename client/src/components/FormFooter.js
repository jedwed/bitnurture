import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const FormFooter = () => {
  return (
    <div className="formFooter">
      <Button variant="text" component={Link} to="/">
        Cancel
      </Button>

      <Button variant="contained">Submit</Button>
    </div>
  );
};

export default FormFooter;