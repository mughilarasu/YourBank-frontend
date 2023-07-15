import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { endPoint } from "../endPoint";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ setIsAuthenticated, userData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState({
    state: false,
    message: "",
    type: "",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({
      state: false,
      message: "",
      type: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      let url = endPoint.baseUrl + "/api/customer-login/";
      const response = await axios.post(url, {
        username,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      userData(response.data);
      setOpen(false);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setOpen(false);
      setOpenAlert({
        state: true,
        message: "Login Failed",
        type: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formLogin">
        <div className="formLoginDiv">
          <label htmlFor="Username" className="formLoginLabel">
            Username:
          </label>
          <input
            type="text"
            id="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            className="formLoginInput"
          />
        </div>
        <div className="formLoginDiv">
          <label htmlFor="password" className="formLoginLabel">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="formLoginInput"
          />
        </div>
        <button type="submit" className="formLoginButton">
          Log In
        </button>
      </form>
      <Snackbar
        open={openAlert.state}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={openAlert.type}
          sx={{ width: "100%" }}
        >
          {openAlert.message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Login;
