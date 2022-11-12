import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");


  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/isAuthenticated", config);
        setIsAuthenticated(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // navigate("/login");
      }
    };
    checkAuth();
  }
  , [navigate]);

  if (isLoading) {
    return <div style={
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5"
      }
    }>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};


export default PrivateRoute;
