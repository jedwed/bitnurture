import React from "react";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Typography variant="caption">
        A password stores that securely nurtures all your passwords with the
        beauty of encryption. All you have to remember is one password.
      </Typography>
      <div className="homeButtons">
        <Button
          component={Link}
          to={"/login"}
          variant="outlined"
          style={{ margin: 5 }}
        >
          <LoginIcon style={{ marginRight: 10 }} />
          <Typography>Login</Typography>
        </Button>
        <Button
          component={Link}
          to={"/signup"}
          variant="outlined"
          style={{ margin: 5 }}
        >
          <PersonAddIcon style={{ marginRight: 10 }} />
          <Typography>Sign Up</Typography>
        </Button>
      </div>
    </div>
  );
};

export default Home;
