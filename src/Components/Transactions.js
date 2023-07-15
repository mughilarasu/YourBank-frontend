import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import DownloadIcon from "@mui/icons-material/Download";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import moment from "moment";
import { endPoint } from "../endPoint";
import { transactionsHistory } from "../mockData";

export default function Transactions({
  //   isAuthenticated,
  //   setIsAuthenticated,
  userData,
  //   setUserData,
  userAccountData,
  //   setUserAccountData,
}) {
  const [selectTransactionType, setSelectTransactionType] = React.useState("7");
  const [transactionData, setTransactionData] = React.useState(
    []
  );
  const [startDate, setStartDate] = React.useState(moment());
  const [endDate, setEndDate] = React.useState(moment());
  const [open, setOpen] = React.useState(false);
  const selectedAccountNumber = `${userData.customer.name}-${userAccountData.account_number}`;
  const DownloadCsv = () => {
    const csvHeaders = [
      "Type",
      "Source Account",
      "Target Account",
      "Amount",
      "Currency Type",
      "Transaction Date",
    ];
    const csvData = transactionData.map((row) => [
      selectedAccountNumber === row.target_account ? "Credit" : "Debit",
      row.source_account,
      row.target_account,
      row.amount,
      row.currency_type,
      moment.utc(row.transaction_date).format("YYYY-MM-DD"),
    ]);

    const csvString =
      csvHeaders.join(",") +
      "\n" +
      csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${selectedAccountNumber} transactions.csv`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };
  const getTransactionData = async (value, start, end) => {
    if (value === "custom") {
      start = moment(startDate?._d).format("YYYY-MM-DD");
      end = moment(endDate?._d).format("YYYY-MM-DD");
    }
    setOpen(true);
    try {
      const token = sessionStorage.getItem("token");

      let url =
        endPoint.baseUrl +
        `/api/txn-history/?start=${start}&end=${end}&account_id=${userAccountData.customer}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setOpen(false);
      setTransactionData(response.data.transactions);
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };
  React.useEffect(() => {
    const currentDate = moment();
    const subtractedDate = moment(currentDate).subtract(7, "days");
    const start = moment().format("YYYY-MM-DD");
    const end = subtractedDate.format("YYYY-MM-DD");
    setStartDate(start);
    setEndDate(end);
    getTransactionData(selectTransactionType, start, end);
  }, []);

  return (
    <Box>
      <Box style={{ display: "flex" }}>
        <FormControl variant="standard" sx={{ m: 1, width: 150 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectTransactionType}
            label="Select Currency"
            onChange={(e) => {
              setSelectTransactionType(e.target.value);

              if (e.target.value === "7") {
                const currentDate = moment();
                const subtractedDate = moment(currentDate).subtract(7, "days");
                const start = moment().format("YYYY-MM-DD");
                const end = subtractedDate.format("YYYY-MM-DD");
                setStartDate(start);
                setEndDate(end);
                getTransactionData(e.target.value, start, end);
              } else if (e.target.value === "30") {
                const currentDate = moment();
                const subtractedDate = moment(currentDate).subtract(30, "days");
                const start = moment().format("YYYY-MM-DD");
                const end = subtractedDate.format("YYYY-MM-DD");
                setStartDate(start);
                setEndDate(end);
                getTransactionData(e.target.value, start, end);
              } else {
                const start = moment();
                const end = moment();
                setStartDate(start);
                setEndDate(end);
                getTransactionData(e.target.value, start, end);
              }
            }}
          >
            <MenuItem value={"7"}>Last 7 days</MenuItem>
            <MenuItem value={"30"}>Last 30 days</MenuItem>
            <MenuItem value={"custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
        {selectTransactionType === "custom" && (
          <Box style={{ display: "flex" }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Start"
                  format="YYYY-MM-DD"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                <DatePicker
                  label="End"
                  value={endDate}
                  format="YYYY-MM-DD"
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ m: 1, height: 50 }}
              onClick={(e) =>
                getTransactionData(selectTransactionType, startDate, endDate)
              }
            >
              Plot
            </Button>
          </Box>
        )}
        <Box>
          <IconButton size="small" sx={{ m: 1 }} onClick={DownloadCsv}>
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 275, m: 0.5 }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData.length > 0 ? (
              transactionData.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {selectedAccountNumber === row.target_account ? (
                      <CallReceivedIcon color="success" />
                    ) : (
                      <CallMadeIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {moment.utc(row.transaction_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="center">{row.source_account}</TableCell>
                  <TableCell align="center">{row.target_account}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.currency_type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  No Transactions Found
                </TableCell>{" "}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
