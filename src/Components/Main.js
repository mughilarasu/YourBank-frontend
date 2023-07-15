import React, { useState } from "react";
import Box from "@mui/material/Box";
import Dashboard from "./Dashboard";
import Header from "./Header";

export default function Main({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
}) {
  const [userAccountData, setUserAccountData] = useState({});
  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userData={userData}
        setUserData={setUserData}
      />
      <Box sx={{ m: 2 }}>
        <Dashboard
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userData={userData}
          setUserData={setUserData}
          userAccountData={userAccountData}
          setUserAccountData={setUserAccountData}
        />
      </Box>
    </>
  );
}
