import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const PrivateRoute = () => {
  // create a private routes components
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/isAuthenticated");
        setIsAuthenticated(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate("/login");
      }
    };
    checkAuth();
  }
  , [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
};


export default PrivateRoute;
