import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";

export default function Header({ setIsAuthenticated, setUserData }) {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setUserData({});
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }}>
            <AccountBalanceIcon />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Bank
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
