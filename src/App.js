import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import "./App.css";
import { loginData } from "./mockData";

const App = () => {
  const token = sessionStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
            <Route
              path="/login"
              element={<Navigate to={"/dashboard"} replace />}
            />
            <Route
              path="/dashboard"
              element={
                <Main
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  userData={userData}
                  setUserData={setUserData}
                />
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to={"/login"} replace />} />
            <Route
              path="/dashboard"
              element={<Navigate to={"/login"} replace />}
            />
            <Route
              path="/login"
              element={
                <Login
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
