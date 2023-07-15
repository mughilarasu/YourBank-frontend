import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { endPoint } from "../endPoint";
import { allAccounts } from "../mockData";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SendMoney({
  //   isAuthenticated,
  //   setIsAuthenticated,
  //   userData,
  //   setUserData,
  userAccountData,
  //   setUserAccountData,
}) {
  const [toAccountNumber, setToAccountNumber] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [toAccNumArr, setToAccNumArr] = React.useState([]);
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
  const getToAccountNumber = async () => {
    setOpen(true);
    try {
      const token = sessionStorage.getItem("token");
      let url = endPoint.baseUrl + "/api/all-accounts/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setOpen(false);
      setToAccNumArr(response.data);
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };
  React.useEffect(() => {
    getToAccountNumber();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const token = sessionStorage.getItem("token");
      let url = endPoint.baseUrl + "/api/transfer-money/";
      const response = await axios.post(
        url,
        {
          source_account_id: userAccountData.account_number,
          target_account_id: toAccountNumber,
          amount: amount,
          currency: currency,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setOpen(false);
      setOpenAlert({
        state: true,
        message: "Money Transferred Successfully",
        type: "success",
      });
      setAmount("");
      setCurrency("");
      setToAccountNumber("");
    } catch (error) {
      console.error(error);
      setOpen(false);
      setOpenAlert({
        state: true,
        message: "Money Transfer Failed",
        type: "error",
      });
    }
  };
  return (
    <Box>
      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-label">
          Select Account Number
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={toAccountNumber}
          label="Select Account Number"
          onChange={(e) => setToAccountNumber(e.target.value)}
        >
          {toAccNumArr.map((to, i) => {
            return (
              <MenuItem value={to.account_number} key={i}>
                {to.account_number} ({" "}
                {userAccountData.account_number === to.account_number
                  ? "Self"
                  : to.customer.name}{" "}
                )
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-label">Select Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Select Currency"
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"INR"}>INR</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
      </FormControl>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
      </Box>

      <Button
        variant="contained"
        sx={{ m: 1 }}
        disabled={toAccountNumber === "" || amount === "" || currency === ""}
        onClick={(e) => handleSubmit(e)}
      >
        Send
      </Button>

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
    </Box>
  );
}
