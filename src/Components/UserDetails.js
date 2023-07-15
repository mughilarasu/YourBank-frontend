import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import TabComponent from "./TabComponent";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "80vh",
  overflowY: "auto",
}));
const UserDetails = ({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
  userAccountData,
  setUserAccountData,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3.5}>
          <Item>
            <List>
              <ListItem>
                <ListItemText
                  primary={userData.customer.name}
                  secondary="Name"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={userData.customer.id}
                  secondary="Customer ID"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={userData.customer.user.email}
                  secondary="Email"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={userData.customer.mobile_number}
                  secondary="Mobile Number"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={userData.customer.address}
                  secondary="Address"
                />
              </ListItem>
            </List>
          </Item>
        </Grid>
        <Grid item xs={8.5}>
          <Item>
            {Object.keys(userAccountData).length !== 0 ? (
              <TabComponent
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                userData={userData}
                setUserData={setUserData}
                userAccountData={userAccountData}
                setUserAccountData={setUserAccountData}
              />
            ) : (
              <>
                {userData.account.length > 0 ? (
                  userData.account.map((acc, i) => {
                    return (
                      <List
                        sx={{
                          m: 1,
                          cursor: "pointer",
                          "&:hover": {
                            border: "1px solid",
                          },
                        }}
                        component={Paper}
                        onClick={() => setUserAccountData(acc)}
                        key={i}
                      >
                        <ListItem>
                          <ListItemText
                            primary={acc.account_number}
                            secondary="Account Number"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={acc.balance}
                            secondary="Balance"
                          />
                        </ListItem>
                      </List>
                    );
                  })
                ) : (
                  <h3>No Accounts Found</h3>
                )}
              </>
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
