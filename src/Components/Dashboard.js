import React from "react";
import Box from "@mui/material/Box";
import UserDetails from "./UserDetails";

const Dashboard = ({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
  userAccountData,
  setUserAccountData,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserDetails
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userData={userData}
        setUserData={setUserData}
        userAccountData={userAccountData}
        setUserAccountData={setUserAccountData}
      />
    </Box>
  );
};

export default Dashboard;
