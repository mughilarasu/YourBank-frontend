import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendMoney from "./SendMoney";
import Transactions from "./Transactions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabComponent({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
  userAccountData,
  setUserAccountData,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Box sx={{ display: "flex", m: 2 }}>
        <IconButton onClick={() => setUserAccountData({})}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography sx={{ m: 1 }}>
          Account Number : {userAccountData.account_number}
        </Typography>
      </Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Transfer Money" {...a11yProps(0)} />
          <Tab label="Transactions History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <SendMoney
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userData={userData}
          setUserData={setUserData}
          userAccountData={userAccountData}
          setUserAccountData={setUserAccountData}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Transactions
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userData={userData}
          setUserData={setUserData}
          userAccountData={userAccountData}
          setUserAccountData={setUserAccountData}
        />
      </TabPanel>
    </Box>
  );
}
