import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/userContext";


const PrivateRoute = () => {
  const [userContext, setUserContext] = useContext(UserContext)

  return userContext.token ? <Outlet/> : <Navigate to="/login"/>;
  
};


export default PrivateRoute;
