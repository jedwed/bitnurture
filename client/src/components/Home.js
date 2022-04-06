import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      A password stores that securely nurtures all your passwords with the
      beauty of encryption. All you have to remember is one password.
      <br />
      <div className="homeButtons">
        <Button
          component={Link}
          to={"/login"}
          variant="outlined"
          style={{ margin: 5 }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to={"/signup"}
          variant="outlined"
          style={{ margin: 5 }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Home;