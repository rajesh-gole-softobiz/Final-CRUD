import { ButtonGroup, Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  return (
    <div>
      <ButtonGroup variant="contained">
        <Button variant="contained" component={Link} to={"/dashboard"}>
          Home
        </Button>
        <Button variant="outlined" component={Link} to={"/adduser"}>
          Add User
        </Button>
        <Button variant="outlined" component={Link} to={"/all-users"}>
          All Users
        </Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Log out
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;
